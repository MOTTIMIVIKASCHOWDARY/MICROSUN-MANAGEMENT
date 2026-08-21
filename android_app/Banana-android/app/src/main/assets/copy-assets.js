const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname);
const androidAssetsDir = path.resolve(__dirname, 'android/app/src/main/assets');
const wwwDir = path.resolve(__dirname, 'www');

const validExtensions = ['.html', '.css', '.js', '.png', '.jpg', '.jpeg', '.json', '.svg', '.webp', '.ico'];

function copyFiles(destDir) {
    if (!fs.existsSync(destDir)) {
        fs.mkdirSync(destDir, { recursive: true });
    }
    const files = fs.readdirSync(srcDir);
    files.forEach(file => {
        const srcFile = path.join(srcDir, file);
        const stat = fs.statSync(srcFile);
        if (stat.isFile() && validExtensions.includes(path.extname(file).toLowerCase())) {
            fs.copyFileSync(srcFile, path.join(destDir, file));
        }
    });
    const diseaseImagesSrc = path.join(srcDir, 'disease_images');
    if (fs.existsSync(diseaseImagesSrc)) {
        const diseaseImagesDest = path.join(destDir, 'disease_images');
        if (!fs.existsSync(diseaseImagesDest)) fs.mkdirSync(diseaseImagesDest, { recursive: true });
        fs.readdirSync(diseaseImagesSrc).forEach(img => {
            fs.copyFileSync(path.join(diseaseImagesSrc, img), path.join(diseaseImagesDest, img));
        });
    }
}

copyFiles(androidAssetsDir);
copyFiles(wwwDir);
console.log('✅ Assets synced successfully!');
