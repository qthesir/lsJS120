const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function download(ms, letter) {
  console.log(`Starting download ${letter}`)
  await sleep(ms)
  console.log(`Finished download ${letter}`)
}

async function main() {
  await Promise.all([download(2000, 'A'),
  download(2000, 'B'),
  download(2000, 'C')])
  console.log('Main is done')
}

main()