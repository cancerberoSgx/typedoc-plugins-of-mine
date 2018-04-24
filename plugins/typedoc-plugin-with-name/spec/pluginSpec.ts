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

    // make sure typedoc-plugin-with-name is uninstalled and generate ast-wihout.json with output without the plugin
    expect(shell.exec('yarn install').code).toBe(0);
    expect(shell.exec('yarn remove typedoc-plugin-with-name').code).toBe(0);
    // expect(shell.exec('yarn install').code).toBe(0);
    // expect(shell.exec('node -p \"require(\'typedoc-plugin-with-name\')\"').code).not.toBe(0);
    expect(shell.exec('yarn run typedoc --out out --json ast-without.json sample1.ts').code).toBe(0);

    // make sure typedoc-plugin-with-name is installed and enerate ast.json with the output with the plugin
    // expect(shell.exec('yarn i typedoc-plugin-with-name').code).toBe(0); // installing from yarn
    expect(shell.exec('yarn add file:..').code).toBe(0); // installing from this project folder
    // expect(shell.exec('node -p \"require(\'typedoc-plugin-with-name\')\"').code).toBe(0);
    expect(shell.exec('yarn run typedoc --plugin typedoc-plugin-with-name --out out --json ast-with.json sample1.ts').code).toBe(0);

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
