{
    _id: <string>,
    version: <int>,
    term: <int>,
    protocolVersion: <number>,
    writeConcernMajorityJournalDefault: <boolean>,
    configsvr: <boolean>,
    members: [
      {
        _id: <int>,
        host: <string>,
        arbiterOnly: true,
        buildIndexes: <boolean>,
        hidden: <boolean>,
        priority: <number>,
        tags: <document>,
        secondaryDelaySecs: <int>,
        votes: <number>
      },
      ...
    ],
    settings: {
      chainingAllowed : <boolean>,
      heartbeatIntervalMillis : <int>,
      heartbeatTimeoutSecs: <int>,
      electionTimeoutMillis : <int>,
      catchUpTimeoutMillis : <int>,
      getLastErrorModes : <document>,
      getLastErrorDefaults : <document>,
      replicaSetId: <ObjectId>
    }
  }