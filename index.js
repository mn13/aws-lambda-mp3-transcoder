/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk')
const util = require('util')

const elastictranscoder = new AWS.ElasticTranscoder()

exports.handler = async function handler(event) {
  console.log('Reading options from event:\n', util.inspect(event, { depth: 5 }))
  const createJob = util.promisify(elastictranscoder.createJob).bind(elastictranscoder)
  // Object key may have spaces or unicode non-ASCII characters.
  const srcKey = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '))
  const dstKey = `${srcKey.split('.').slice(0, -1).join('.')}.mp3`
  console.log(srcKey, dstKey)

  const { Job } = await createJob({
    PipelineId: process.env.PIPE_LINE_ID,
    Input: {
      AspectRatio: 'auto',
      Container: 'auto',
      FrameRate: 'auto',
      Interlaced: 'auto',
      Key: srcKey,
      Resolution: 'auto',
    },
    Output: {
      Key: dstKey,
      PresetId: process.env.PRESET_ID,
    },
  })
  return Job
}
