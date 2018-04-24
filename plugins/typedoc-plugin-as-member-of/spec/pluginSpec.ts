import * as shell from 'shelljs';
 
describe('plugin ', () => {
 
  beforeAll(() => {
    // shell.rm('-rf', 
            //  'test/node_modules', 'test/out', 'test/ast.json', 'test/package-lock.json', 
            //  'newProject',
            // );
  });
  
  afterAll(() => {
    // shell.rm('-rf', 'test/node_modules', 'test/out', 'test/ast.json', 'test/package-lock.json', 
            //  'newProject',
  // );
  });

  it('should move entities annotated with @asMemberOf and if it is marked as event should motate it as an event', () => {
   
    // make a copy of a working project
    // shell.cp('-r', 'test' ,'newProject');
    shell.cd('newProject');

    // make sure typedoc-plugin-as-member-of is uninstalled and generate ast-wihout.json with output without the plugin
    // expect(shell.exec('npm install').code).toBe(0);
    // expect(shell.exec('npm remove typedoc-plugin-as-member-of').code).toBe(0);
    // expect(shell.exec('npm install').code).toBe(0);
    // expect(shell.exec('node -p \"require(\'typedoc-plugin-as-member-of\')\"').code).not.toBe(0);
    // expect(shell.exec('node node_modules/typedoc/bin/typedoc --out out-without --json ast-without.json sample1.ts').code).toBe(0);

    // // make sure typedoc-plugin-as-member-of is installed and enerate ast.json with the output with the plugin
    // // expect(shell.exec('npm i typedoc-plugin-as-member-of').code).toBe(0); // installing from npm
    // expect(shell.exec('npm i ..').code).toBe(0); // installing from this project folder
    // expect(shell.exec('node -p \"require(\'typedoc-plugin-as-member-of\')\"').code).toBe(0);
    // expect(shell.exec('node node_modules/typedoc/bin/typedoc --plugin typedoc-plugin-as-member-of --out out --json ast-with.json sample1.ts').code).toBe(0);

    const astWithout = JSON.parse(shell.cat('ast-without.json').toString());
    const astWith = JSON.parse(shell.cat('ast-with.json').toString());

    let SecondAttemptEmitter = astWithout.children[0].children[0]
    expect(SecondAttemptEmitter.name).toBe('SecondAttemptEmitter')
    expect(SecondAttemptEmitter.children).not.toContain(col=>col.find(c=>c.name==='beforeEngineStart'))

    SecondAttemptEmitter = astWith.children[0].children[0]
    expect(SecondAttemptEmitter.name).toBe('SecondAttemptEmitter')
    expect(SecondAttemptEmitter.children.map(c=>c.name)).toContain('beforeEngineStart')
    
    shell.cd('..');
    console.log('TEST END');
  });
});


function timesInside(s1:string, s2:string):number {
  return s2.split(s1).length - 1;
}
