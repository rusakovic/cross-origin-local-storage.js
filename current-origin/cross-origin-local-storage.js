const CrossOriginLocalStorage = function(currentWindow, iframe, allowedOrigins, onMessage) {
  this.allowedOrigins = allowedOrigins;

  let childWindow;
  // some browser (don't remember which one) throw exception when you try to access
  // contentWindow for the first time, it works when you do that second time

  
  try {
      childWindow = iframe.contentWindow;
  } catch(e) {
      childWindow = iframe.contentWindow;
  }

  //  window.onmessage create a new EventSource object and specify the URL of the page sending the updates
  // with event.origin we check trusted domains names
  currentWindow.onmessage = (event) => {
    if (!this.isAllowedOrigin(event.origin)) {
      return;
    }
    return onMessage(JSON.parse(event.data), event);
  };

  this.isAllowedOrigin = (origin) => {
    return this.allowedOrigins.includes(origin);
  }

  this.getData = (key) => {
    const messageData = {
      key: key,
      method: 'get',
    }
    this.postMessage(messageData);
    console.log('GET method is done', messageData)
  }

  this.setData = (key, data) => {
    const messageData = {
      key: key,
      method: 'set',
      data: data,
    }
    this.postMessage(messageData);
    console.log('SET method is done (written)', messageData)
  }

  // this part was added by me
  this.removeData = (key) => {
    const messageData = {
      key: key,
      method: 'remove'
    }
    this.postMessage(messageData);
    console.log('REMOVE method is done (removed)', messageData)
  }

  this.postMessage = (messageData) => {
    childWindow.postMessage(JSON.stringify(messageData), '*');
  }
};