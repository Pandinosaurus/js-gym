const API = (function() {
  const {GYM_SERVER, request} = typeof module !== 'undefined' 
    && typeof module.exports !== 'undefined'
    ? {
      GYM_SERVER: 'http://localhost:5000/v1/envs/',
      request: require('superagent'),
    } : {
      GYM_SERVER: 'http://' + document.domain + ':' + location.port + '/v1/envs/',
      request: superagent,
    };
    
  const environmentCreate = async (envId) => {
    try {
      const res = await request
        .post(GYM_SERVER)
        .send({ env_id: envId});
      return res.body.instance_id;
    } catch(err) {
      throw "Unable to create environment: " + envId + '\n' + err;
    }
  }

  const environmentList = async () => {
    try {
      const res = await request
        .get(GYM_SERVER);
      return res.body.all_envs;
    } catch(err) {
      throw 'Unable to list environments\n' + err;
    }
  }

  const environmentReset = async (instanceId) => {
    try {
      const res = await request
        .post(GYM_SERVER+ instanceId + '/reset/');
      return res.body.observation;
    } catch(err) {
      throw 'Unable to reset environments\n' + err;
    }
  }

  const environmentStep = async (instanceId, action, render=false) => {
    try {
      const res = await request
        .post(GYM_SERVER+ instanceId + '/step/')
        .send({ action, render});
      return res.body;
    } catch(err) {
      throw 'Unable to step\n' + err;
    }
  }

  const environmentClose = async (instanceId) => {
    try {
      const res = await request
        .post(GYM_SERVER+ instanceId + '/close/');
      return res.body;
    } catch(err) {
      throw 'Unable to close environment\n' + err;
    }
  }

  const actionSpaceInfo = async (instanceId) => {
    try {
      const res = await request
        .get(GYM_SERVER+ instanceId + '/action_space/');
      return res.body.info;
    } catch(err) {
      throw 'Unable to get action space sample\n' + err;
    }
  }

  const actionSpaceSample = async (instanceId) => {
    try {
      const res = await request
        .get(GYM_SERVER+ instanceId + '/action_space/sample');
      return res.body.action;
    } catch(err) {
      throw 'Unable to get action space sample\n' + err;
    }
  }

  const actionSpaceContains = async (instanceId, x) => {
    try {
      const res = await request
        .get(GYM_SERVER+ instanceId + '/action_space/contains/'+x);
      return res.body.member;
    } catch(err) {
      throw 'Unable to get action space sample\n' + err;
    }
  }

  const observationSpaceInfo = async (instanceId) => {
    try {
      const res = await request
        .get(GYM_SERVER+ instanceId + '/observation_space/');
      return res.body.info;
    } catch(err) {
      throw 'Unable to get observation space info\n' + err;
    }
  }

  const maxEpisodeSteps = async (instanceId) => {
    try {
      const res = await request
        .get(GYM_SERVER+ instanceId + '/max_episode_steps/');
      return res.body;
    } catch(err) {
      throw 'Unable to get max episode steps\n' + err;
    }
  }

  return  {
    actionSpaceInfo,
    environmentClose,
    environmentCreate,
    environmentReset,
    maxEpisodeSteps,
    observationSpaceInfo,
  }
})();

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = API;
}
