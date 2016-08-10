'use strict';

var storj = require('storj');
var fs = require('fs');
// Set the bridge api URL
var api = 'https://api.storj.io';

// Load keypair from your saved private key
var keypair = storj.KeyPair(fs.readFileSync('./private.key').toString());

// Login using the keypair generated
var client = storj.BridgeClient(api, {keypair: keypair});

client.getBuckets(function(err, buckets) {
  if (err) {
    return console.log('error', err.message);
  }

  if (!buckets.length) {
    return console.log('warn', 'You have not created any buckets.');
  }

  buckets.forEach(function(bucket) {
    console.log(
      'info',
      'ID: %s, Name: %s, Storage: %s, Transfer: %s',
      [bucket.id, bucket.name, bucket.storage, bucket.transfer]
    );
  });
});
