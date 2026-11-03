import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, join, resolve } from 'node:path';

export const repositoryRoot = resolve(import.meta.dirname, '..');
const npmCache = join(tmpdir(), 'chayns-ui-npm-cache');

export function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: repositoryRoot,
    encoding: 'utf8',
    env: { ...process.env, npm_config_cache: npmCache },
    stdio: options.capture ? 'pipe' : 'inherit',
    ...options,
  });
}

export function createTemporaryDirectory(prefix) {
  return mkdtempSync(join(tmpdir(), prefix));
}

export function packPackage(packageDirectory, destination) {
  const packagePath = resolve(repositoryRoot, packageDirectory);
  const manifest = JSON.parse(readFileSync(join(packagePath, 'package.json'), 'utf8'));
  const hasWorkspacePeer = Object.values(manifest.peerDependencies ?? {}).some((range) =>
    range.startsWith('workspace:'),
  );
  const output = hasWorkspacePeer
    ? run(
        'corepack',
        ['pnpm', '--dir', packagePath, 'pack', '--pack-destination', destination, '--json'],
        { capture: true },
      )
    : run('npm', ['pack', packagePath, '--pack-destination', destination, '--json'], {
        capture: true,
      });
  const parsed = JSON.parse(output);
  const result = Array.isArray(parsed) ? parsed[0] : parsed;

  if (!result?.filename) throw new Error(`npm pack returned no filename for ${packageDirectory}`);
  return resolve(destination, result.filename);
}

export function prepareConsumer() {
  const directory = createTemporaryDirectory('chayns-ui-consumer-');
  cpSync(join(repositoryRoot, 'fixtures/react-consumer'), directory, { recursive: true });
  const packageDirectory = join(directory, 'packages');
  mkdirSync(packageDirectory);
  const coreTarball = packPackage(join(repositoryRoot, 'packages/core'), packageDirectory);
  const businessTarball = packPackage(join(repositoryRoot, 'packages/business'), packageDirectory);
  const tokensTarball = packPackage(join(repositoryRoot, 'packages/tokens'), packageDirectory);
  const manifestPath = join(directory, 'package.json');
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'));
  manifest.dependencies['@chayns-ui/business'] = `file:./packages/${basename(businessTarball)}`;
  manifest.dependencies['@chayns-ui/core'] = `file:./packages/${basename(coreTarball)}`;
  manifest.dependencies['@chayns-ui/tokens'] = `file:./packages/${basename(tokensTarball)}`;
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  const consumerTypesPath = join(directory, 'tsconfig.json');
  const consumerTypes = JSON.parse(readFileSync(consumerTypesPath, 'utf8'));
  delete consumerTypes.compilerOptions.paths;
  writeFileSync(consumerTypesPath, `${JSON.stringify(consumerTypes, null, 2)}\n`);
  return directory;
}
