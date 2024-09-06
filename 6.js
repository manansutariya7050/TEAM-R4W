// Check if the service worker and notifications are supported by the browser
if ('serviceWorker' in navigator && 'Notification' in window) {
    navigator.serviceWorker.register('sw.js').then(reg => {
        console.log('Service Worker Registered!', reg);
    }).catch(err => {
        console.error('Service Worker registration failed:', err);
    });
}

function subscribeUser() {
    // Check if notifications are already allowed
    if (Notification.permission === 'granted') {
        sendNotification();
    } else if (Notification.permission !== 'denied') {
        // Request permission for notifications
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                sendNotification();
            }
        });
    }
}

function sendNotification() {
    navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Garbage Collection', {
            body: 'Today we are coming to collect your garbage.',
            icon: 'icon.png', // Optional icon
            vibrate: [200, 100, 200], // Vibration pattern
            tag: 'garbage-collection-notification',
        });
    });
}