
async function onDisplayNotification)(){
  const channelId = await notifee.createChannel({
      id:'default',
      name:'Default Channel',
      });

    await notifee.displayNotification({
        title:'Notification title',
        body:'zzzz',
        android:{
            channelId,
            smallIcon: null,
            pressAction:{
                id:'default',
                }
        })
    }