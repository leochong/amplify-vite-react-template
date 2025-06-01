import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { firstBucket } from './storage/resource';
// needed to add AI in the future
defineBackend({
  auth,
  data,
  firstBucket,
});
