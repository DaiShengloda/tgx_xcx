let storage = new Map();
class Observer {
  //订阅
  subscription(subject, handler) {
    if (!handler) {
      return false;
    }
    storage.set(subject, handler);
  }
  //取消订阅
  unsubscription(subject) {
    storage.delete(subject);
  }
  //展示所有订阅
  listAll(){
    return storage.entries();
  }
  //清空
  clear(){
    storage.clear();
  }
  //广播消息
  broadcast(subject, ...data) {
    let handler = storage.get(subject);
    if (handler != undefined)
      handler(data);
  }
}
console.log('observer util start work!');

export { Observer }
