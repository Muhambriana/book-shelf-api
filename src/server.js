import Hapi from '@hapi/hapi';
import notesPlugins from './plugins/notes_plugins.js';

const init = async () => {
  const server = Hapi.server();

  // Register one plugin
  await server.register({
    plugin: notesPlugins,
    options: { notes: [] },
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
