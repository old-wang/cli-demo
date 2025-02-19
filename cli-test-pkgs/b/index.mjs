import ora from 'ora';

const b = () => {
  const loading = ora('Loading...').start();

  setTimeout(() => {
    loading.stop()
  }, 1000)
}

export default b
