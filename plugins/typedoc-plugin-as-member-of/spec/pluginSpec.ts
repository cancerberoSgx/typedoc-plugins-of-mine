import * as shell from 'shelljs';
 
describe('plugin ', () => {
 
  beforeAll(() => {
    shell.rm('-rf', 
             'test/node_modules', 'test/out', 'test/ast.json', 'test/package-lock.json', 
             'newProject',   );
  });
  
  afterAll(() => {
    shell.rm('-rf', 'test/node_modules', 'test/out', 'test/ast.json', 'test/package-lock.json', 
             'newProject',  );
  // expect(shell.exec('yarn add file:..').code).toBe(0); // because sometimes when test
  });

  it('should move entities annotated with @asMemberOf and if it is marked as event should mutate it as an event', () => {
   
    // make a copy of a working project
    shell.cp('-r', 'test' ,'newProject');
    shell.cd('newProject');

    // make sure typedoc-plugin-as-member-of is uninstalled and generate ast-wihout.json with output without the plugin

    expect(shell.exec('yarn install').code).toBe(0);
    expect(shell.exec('yarn remove typedoc-plugin-as-member-of').code).toBe(0);
    // expect(shell.exec('yarn install').code).toBe(0);
    // let nodeCmd = 'node -p \"require(\'typedoc-plugin-as-member-of\')\"'
    // console.log('EXECUTING CMD '+nodeCmd)
    // expect(shell.exec(nodeCmd).code).not.toBe(0);
    expect(shell.exec('yarn run typedoc --out out-without --json ast-without.json sample1.ts').code).toBe(0);

    // make sure typedoc-plugin-as-member-of is installed and geerates ast.json with the output with the plugin
    // expect(shell.exec('yarn i typedoc-plugin-as-member-of').code).toBe(0); // installing from npmjs.org

    expect(shell.exec('yarn add file:..').code).toBe(0); // installing from ocal project. 

    // nodeCmd = 'node -p \"require(\'typedoc-plugin-as-member-of\')\"'
    // console.log('EXECUTING CMD '+nodeCmd)
    // expect(shell.exec(nodeCmd).code).toBe(0);
    expect(shell.exec('yarn run typedoc --plugin typedoc-plugin-as-member-of --out out --json ast-with.json sample1.ts').code).toBe(0);

    const astWithout = JSON.parse(shell.cat('ast-without.json').toString());
    const astWith = JSON.parse(shell.cat('ast-with.json').toString());

    let SecondAttemptEmitter = astWithout.children[0].children[0]
    expect(SecondAttemptEmitter.name).toBe('SecondAttemptEmitter')
    expect(SecondAttemptEmitter.children).not.toContain(col=>col.find(c=>c.name==='beforeEngineStart'))

    SecondAttemptEmitter = astWith.children[0].children[0]
    expect(SecondAttemptEmitter.name).toBe('SecondAttemptEmitter')
    expect(SecondAttemptEmitter.children.map(c=>c.name)).toContain('beforeEngineStart')
    
    console.log('TEST END');
  });
});


function timesInside(s1:string, s2:string):number {
  return s2.split(s1).length - 1;
}
