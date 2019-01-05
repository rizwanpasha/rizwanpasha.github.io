
if (window.Notification) {
    if (Notification.permission === "granted") {
        console.log("permission already granted");
        myNotification();
    } else {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                console.log("Permission granted");
                myNotification();
            } else if (permission === "denied") {
                console.log("permission denied");
            }
        });
    }
} else {
    console.log("Notifications not supported");
}


function myNotification() {
    var options = {
        body: 'Simple web notification.',
        data:'riz',
        icon: './192x192.png',
        vibrate: [200, 100, 200],
        direction:'rtl',
    }
    var notification = new Notification("Web Notification Demo", options);
 
    //setTimeout(notification.close.bind(notification), 10000);
    notification.addEventListener('show', function () {
        console.log("notification shown");
    });

    notification.addEventListener('close', function () {
        console.log("notification closed");
    });

    notification.addEventListener('click',function(){
        window.open('https://www.google.co.in/','_blank');
    });
    notification.addEventListener('error',function(){
        console.log("error in notification");
    });
}


