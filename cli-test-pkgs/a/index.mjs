import chalk from 'chalk';

const log = console.log;

const a = () => {
  log(chalk.blue('Hello') + ' World' + chalk.red('!'));
}


export default a;