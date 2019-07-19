export const firebaseConfig = {
    apiKey: "AIzaSyBlWgZtCnyVZErsIIcS45jwDCiWqcJcie0",
    authDomain: "myapp-a4a20.firebaseapp.com",
    databaseURL: "https://myapp-a4a20.firebaseio.com",
    projectId: "myapp-a4a20",
    storageBucket: "myapp-a4a20.appspot.com",
    messagingSenderId: "881776552183",
    appId: "1:881776552183:web:871e168d60345e43"
  };

export const SnapShots = snap => {
    let MyArray = [];
    snap.forEach(obj => {
        let item = obj.val();
        item.key = obj.key;
        MyArray.push(item);
    });
    return MyArray;
}