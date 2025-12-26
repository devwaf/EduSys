const abphost = 'http://127.0.0.1:10203'
// import store from '../../store/store';
class SignalRAspNetCoreHelper {
    initSignalR() {
        let abp = window.abp
        //token
        let encryptedAuthToken = localStorage.getItem('encryptedAccessToken');
        // console.log(encryptedAuthToken)
        abp.signalr = {
            autoConnect: true,
            connect: undefined,
            hubs: undefined,
            qs: "enc_auth_token=" + encodeURIComponent(encryptedAuthToken),
            notifyUrl: abphost + '/signalr',
        };

        abp.msgCount = 0;

        (function () {
            // Check if SignalR is defined
            if (!signalR) {
                return;
            }
            // Create namespaces
            abp.signalr = abp.signalr || {};
            abp.signalr.hubs = abp.signalr.hubs || {};
            // app.chat = app.chat || {};

            var chatHub = null;
            // Configure the connection
            function configureNotifyConnection(connection:any) {
                // Set the common hub
                abp.signalr.hubs.common = connection;

                // Reconnect if hub disconnects
                connection.onclose(function (e) {
                    if (e) {
                        abp.log.debug('Connection closed with error: ' + e);
                    } else {
                        abp.log.debug('Disconnected');
                    }

                    if (!abp.signalr.autoConnect) {
                        return;
                    }

                    setTimeout(function () {
                        connection.start();
                    }, 5000);
                });

                // Register to get notifications
                connection.on('getNotification', function (notification:any) {
                    abp.event.trigger('abp.notifications.received', notification);
                });
            }

            function configureChatConnection(connection:any) {
                // Set the chat hub
                abp.signalr.hubs.chatHub = connection;

                // Reconnect if hub disconnects
                connection.onclose(function (e) {
                    if (e) {
                        abp.log.debug('Connection closed with error: ' + e);
                    } else {
                        abp.log.debug('Disconnected');
                    }

                    if (!abp.signalr.autoConnect) {
                        return;
                    }

                    setTimeout(function () {
                        connection.start();
                    }, 5000);
                });

                // Register to get msg
                registerChatEvents(connection);
            }

            // Connect to the server
            abp.signalr.connect = function () {
                var notifyUrl = abp.signalr.notifyUrl;

                // Start the connection.
                startConnection(notifyUrl, configureNotifyConnection)
                    .then(function (connection) {
                        abp.log.debug('Connected to SignalR server!'); // TODO: Remove log
                        abp.event.trigger('abp.signalr.connected');
                        // Call the Register method on the hub.
                        connection.invoke('register').then(function () {
                            abp.log.debug('Registered to the SignalR server!'); // TODO: Remove log
                        });
                    })
                    .catch(function (error) {
                        abp.log.debug(error.message);
                    });
            };

            // Starts a connection with transport fallback - if the connection cannot be started using
            // the webSockets transport the function will fallback to the serverSentEvents transport and
            // if this does not work it will try longPolling. If the connection cannot be started using
            // any of the available transports the function will return a rejected Promise.
            function startConnection(url, configureConnection) {
                if (abp.signalr.remoteServiceBaseUrl) {
                    url = abp.signalr.remoteServiceBaseUrl + url;
                }

                // Add query string: https://github.com/aspnet/SignalR/issues/680
                if (abp.signalr.qs) {
                    url += '?' + abp.signalr.qs;
                }

                return (function start(transport) {
                    abp.log.debug('Starting connection using ' + signalR.TransportType[transport] + ' transport');
                    var connection = new signalR.HubConnection(url, { transport: transport });
                    if (configureConnection && typeof configureConnection === 'function') {
                        configureConnection(connection);
                    }

                    return connection.start()
                        .then(function () {
                            return connection;
                        })
                        .catch(function (error) {
                            abp.log.debug('Cannot start the connection using ' + signalR.TransportType[transport] + ' transport. ' + error.message);
                            if (transport !== signalR.TransportType.LongPolling) {
                                return start(transport + 1);
                            }

                            return Promise.reject(error);
                        });
                }(signalR.TransportType.WebSockets));
            }

            abp.signalr.startConnection = startConnection;

            if (abp.signalr.autoConnect === undefined) {
                abp.signalr.autoConnect = true;
            }

            if (abp.signalr.autoConnect) {
                abp.signalr.connect();
            }
            // function registerChatEvents(connection) {

            // }

            abp.signalr.close = function closeConnect() {
                abp.signalr.hubs.common.stop();
                abp.signalr.hubs.chatHub.stop();
            }
        })();
    }
}
export default new SignalRAspNetCoreHelper();