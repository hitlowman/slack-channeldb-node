function setupChannel(slack, token, channel, cb) {
    slack.channels.info({ token: token, channel: channel }, function (err, channelToCreate) {
        if (err && err == 'Error: channel_not_found') {
            slack.channels.create({ token: token, name: channelToCreate }, function (errr, createdChannel) {
                if (errr && errr != 'Error: name_taken') return cb('channels.create::' + errr)
                return cb()
            })
        } else if (err) {
            return cb('channels.info::' + err)
        } else {
            return cb(null)
        }
    })
}

function db(slack, // a reference to slack client object see http://github.com/smallwins/slack
    opts
    // required options are
    // SLACK_TOKEN - valid slack token with the following oauth permissions
    // - channels:write
    // - channels:read
    // - files:read
    // - files:write:user
    // - search:read
    // DB_PARTITION - a database partition each key will be prefixed with this value to support multiple db operating in the same channel in the same team

    // optional values
    // DB_CHANNEL (default: data) the name of the channel to store the data.  Will be automatically created if needed
    // DB_SIGNING (default: true) adds signing information to the json objects to ensure they have not been tampered with
    // DB_ENCRYPTION (default: false) encrypts the json before storing in the channel
    // DB_CONCURRENCY (default: optimistic, possible values optimistic, none) determines how concurrency is maanged 
    //      none is the highest performance but allows stale reads
    //      optimistic waits for slack indexes to commit before returning and thus does not allow stale reads
) {
    if (!slack) {
        throw 'slack object must be passed'
    }
    if (!opts) {
        throw 'opts object must be passed'
    }
    if (!opts.SLACK_TOKEN) {
        throw 'opts object contain SLACK_TOKEN'
    }
    if (!opts.DB_PARTITION) {
        throw 'opts object must contain DB_PARTITION'
    }
    if (!opts.DB_CHANNEL) {
        opts.DB_CHANNEL = 'data'
    }
    if (!opts.DB_SIGNING) {
        opts.DB_SIGNING = true
    }
    if (!opts.DB_ENCRYPTION) {
        opts.DB_ENCRYPTION = false
    }
    if (opts.DB_CONCURRENCY) {
        ops.DB_CONCURRENCY == 'optimistic'
    }


    let kv = {}
    

}

module.exports = db