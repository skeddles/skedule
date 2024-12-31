// https://stackoverflow.com/a/61725416/929321
// https://github.com/cheton/is-electron/blob/master/index.js

export default function isElectron() {
    // Renderer process
    if (typeof window !== 'undefined' && typeof window.process === 'object' && (window.process as any).type === 'renderer') {
        return true;
    }

    // Main process
    if (typeof process !== 'undefined' && typeof process.versions === 'object' && !!process.versions.electron) {
        return true;
    }

    // Detect the user agent when the `nodeIntegration` option is set to true
    if (typeof navigator === 'object' && typeof navigator.userAgent === 'string' && navigator.userAgent.indexOf('Electron') >= 0) {
        return true;
    }

    return false;
}

export const RUNNING_IN_DESKTOP_APP = isElectron();