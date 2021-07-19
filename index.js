const start = async () => {

  // Core
  const core = require('@actions/core')

  const tags = core.getInput('tags')
  const params = core.getInput('params')
  const version = core.getInput('version')
  
  const arrayFilter = JSON.parse(tags).filter(x => x.ref.includes(version))

  let finalVersion

  
  const versionTag = JSON.parse(params).versioning

  if(arrayFilter.length > 0 ) {
    const tagsVersion = arrayFilter[arrayFilter.length - 1].ref.split('/')[2]

    const higher = tagsVersion.split('-')[0].split('.')[0].substring(1)
    const minium = tagsVersion.split('-')[0].split('.')[1]
    const revision = tagsVersion.split('-')[0].split('.')[2]

    if(versionTag === 'Revision') finalVersion = 'v' + higher  + '.' + minium + '.' + (parseInt(revision) + 1) + '-' + version
    if(versionTag === 'Minimum') finalVersion = 'v' + higher  + '.' + (parseInt(minium) + 1) + '.' + 0 + '-' + version
    if(versionTag === 'Higher') finalVersion = 'v' + (parseInt(higher) + 1) + '.' + 0 + '.' + 0 + '-' + version

  } else {
    if(versionTag === 'Revision') finalVersion = 'v' + 0 + '.' + 0 + '.' + 1 + '-' + version
    if(versionTag === 'Minimum') finalVersion = 'v' + 0 + '.' + 1 + '.' + 0 + '-' + version
    if(versionTag === 'Higher') finalVersion = 'v' + 1 + '.' + 0 + '.' + 0 + '-' + version
  }

  if(finalVersion === undefined) throw Error("finalVersion its no generated Correctly, check toy json config to pass correct param")

  console.log(`Successfully Version Generated`, finalVersion)
  core.setOutput('versionApi', finalVersion)
  console.log(`Successfully Version Exported`)
}

start()