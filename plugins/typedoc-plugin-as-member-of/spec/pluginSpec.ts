import * as shell from 'shelljs';
 
describe('plugin ', () => {
 
  beforeAll(() => {
    shell.rm('-rf', 
             'test/node_modules', 'test/out', 'test/ast.json', 'test/package-lock.json', 
            //  'newProject',
            );
  });
  
  afterAll(() => {
    shell.rm('-rf', 'test/node_modules', 'test/out', 'test/ast.json', 'test/package-lock.json', 
            //  'newProject',
  );
  });

  it('should enforce events annotated with @name where typedoc dont do that', () => {
   
    // make a copy of a working project
    shell.cp('-r', 'test' ,'newProject');
    shell.cd('newProject');

    // make sure typedoc-plugin-respect-name-tag is uninstalled and generate ast-wihout.json with output without the plugin
    expect(shell.exec('npm install').code).toBe(0);
    expect(shell.exec('npm remove typedoc-plugin-respect-name-tag').code).toBe(0);
    expect(shell.exec('npm install').code).toBe(0);
    expect(shell.exec('node -p \"require(\'typedoc-plugin-respect-name-tag\')\"').code).not.toBe(0);
    expect(shell.exec('node node_modules/typedoc/bin/typedoc --out out --json ast-without.json sample1.ts').code).toBe(0);

    // make sure typedoc-plugin-respect-name-tag is installed and enerate ast.json with the output with the plugin
    // expect(shell.exec('npm i typedoc-plugin-respect-name-tag').code).toBe(0); // installing from npm
    expect(shell.exec('npm i ..').code).toBe(0); // installing from this project folder
    expect(shell.exec('node -p \"require(\'typedoc-plugin-respect-name-tag\')\"').code).toBe(0);
    expect(shell.exec('node node_modules/typedoc/bin/typedoc --plugin typedoc-plugin-respect-name-tag --out out --json ast-with.json sample1.ts').code).toBe(0);

    const astWithout = shell.cat('ast-without.json').toString();
    const astWith = shell.cat('ast-with.json').toString();

    // custom names added with @name should not be in ast-without and should be in ast.json
    expect(astWithout).not.toContain('"name": "before:add-to-cart"');
    expect(astWith).toContain('"name": "before:add-to-cart"');
    expect(astWithout).not.toContain('"name": "customEvent",');
    // expect(astWith).toContain('"name": "customEvent",');

    // previous names should appear less time in astWith
    expect(timesInside('"name": "addListener",', astWithout)).toBe(4);
    expect(timesInside('"name": "addListener",', astWith)).toBe(2);

    shell.cd('..');
    console.log('TEST END');
  });
});


function timesInside(s1:string, s2:string):number {
  return s2.split(s1).length - 1;
}
