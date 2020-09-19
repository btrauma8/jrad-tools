// This is not part of what gets exported.
// Just a helper file.
// if you look at the feather icon pack svgs...
// and put some in a folder you want converted into react components...
// and run this in that folder...
// it'll create .tsx files out of them.

const fs = require('fs');
const files = fs.readdirSync('.');
const svgs = files.filter(f => f.endsWith('.svg'));
const dashToCamelCase = (s) => s.replace(/-([a-z])/g, g => { return g[1].toUpperCase(); });

console.log('run this in some directory with a lot of feather icon svgs');

const svgToReact = (filename, x) => {
    const dashKey = filename.replace('.svg', ''); // strip the ".svg"
    const camelKey = dashToCamelCase(dashKey);
    const pascalCaseKey = camelKey[0].toUpperCase() + camelKey.slice(1);
    const newSvg = x.replace('svg xmlns', 'svg onClick={onClick} xmlns')
        .replace('width="24"', 'width="1em"')
        .replace('height="24"', 'height="1em"')
        .replace('stroke-width', 'strokeWidth')
        .replace('stroke-linecap', 'strokeLinecap')
        .replace('stroke-linejoin', 'strokeLinejoin')
        .replace('class="feather feather-' + dashKey + '"', 'className={css}')

    const react = `import React from 'react';
import { NamedIconProps } from '../icon/icon';    

export const Icon${pascalCaseKey} = ({ onClick, css }:NamedIconProps) => {
    return (
        ${newSvg}
    );
}`;
    fs.writeFileSync('./icon-' + dashKey + '.tsx', react, 'utf-8');
    console.log('created file ', './icon-' + dashKey + '.tsx');
}
svgs.forEach(file => svgToReact(file, fs.readFileSync('./' + file, 'utf-8')));
