// @ts-nocheck
import PushNotification from 'react-native-push-notification';


export interface ILocalNotificationData {
    date: Date;
    id: string;
    data: Object;
}

export type NotificationParams = {
    /* Android Only Properties */
    channelId: string; // (required) channelId, if the channel doesn't exist, notification will not trigger.
    ticker: string; // (optional)
    showWhen: boolean; // (optional) default: true
    autoCancel: boolean; // (optional) default: true
    largeIcon: string; // (optional) default: "ic_launcher". Use "" for no large icon.
    smallIcon: string; // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    bigText: string; // (optional) default: "message" prop
    subText: string; // (optional) default: none
    bigLargeIcon: string; // (optional) default: undefined
    color: string; // (optional) default: system default
    vibrate: boolean; // (optional) default: true
    vibration: number; // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: string; // (optional) add tag to message
    group: string; // (optional) add group to message
    groupSummary: boolean; // (optional) set this notification to be the group summary for a group of notifications, default: false
    ongoing: boolean; // (optional) set whether this is an "ongoing" notification
    priority: string; // (optional) set notification priority, default: high
    visibility: string; // (optional) set notification visibility, default: private
    ignoreInForeground: boolean; // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    shortcutId: string; // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    onlyAlertOnce: boolean; // (optional) alert will open only once with sound and notify, default: false

    date: Date; // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
    usesChronometer: boolean; // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: number; // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

    invokeApp: boolean; // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    repeatTime: number;

    /* iOS only properties */
    category: string; // (optional) default: empty string
    subtitle: string; // (optional) smaller title below notification title

    /* iOS and Android properties */
    title: string; // (optional)
    message: string; // (required)
    userInfo: Object; // (optional) default: {} (using null throws a JSON value '<null>' error)
    playSound: boolean; // (optional) default: true
    soundName: string; // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    number: number; // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // repeatType: string; // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    allowWhileIdle: boolean;
};

const NotificationDefaultParams = {
    /* Android Only Properties */
    channelId: 'channel-id-2', // (required) channelId, if the channel doesn't exist, notification will not trigger.
    ticker: '', // (optional)
    showWhen: true, // (optional) default: true
    
    autoCancel: true, // (optional) default: true
    largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
    smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
    bigText: '', // (optional) default: "message" prop
    subText: '', // (optional) default: none
    bigLargeIcon: 'ic_launcher', // (optional) default: undefined
    color: 'black', // (optional) default: system default
    vibrate: true, // (optional) default: true
    vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
    tag: 'some_tag', // (optional) add tag to message
    group: 'BWP', // (optional) add group to message
    groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
    ongoing: false, // (optional) set whether this is an "ongoing" notification
    priority: 'high', // (optional) set notification priority, default: high
    visibility: 'private', // (optional) set notification visibility, default: private
    ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
    shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
    onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

    date: null, // (optional)
    usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
    timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

    invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
    repeatTime: 1,

    /* iOS only properties */
    category: '', // (optional) default: empty string
    subtitle: '', // (optional) smaller title below notification title

    /* iOS and Android properties */
    // id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
    title: '', // (optional)
    message: '', // (required)
    userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
    playSound: true, // (optional) default: true
    soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    // number: 1, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    // repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
    allowWhileIdle: false,
};

class LocalNotificationBuilder {
    params: NotificationParams = {...NotificationDefaultParams};

    /**
     * Set the notification ID
     * @param id
     */
    setId(id: number) {
        this.params.id = id;
        return this;
    }

    /**
     * Set the notification title
     * @param title
     */
    setTitle(title: string) {
        this.params.title = title;
        return this;
    }

    /**
     * Set the notification message
     * @param message
     */
    setMessage(message: string) {
        this.params.message = message;
        return this;
    }

    /**
     * Set the notification scheduled time
     * @param date
     */
    setWhen(date: Date) {
        this.params.date = date;
        return this;
    }

    /**
     * After time period notification will be automatically cancelled
     * @param millis
     */
    setTimeout(millis: number) {
        this.params.timeoutAfter = millis;
        return this;
    }

    /**
     * Date and time for the occurrence of the notification
     * @param val
     */
    // eslint-disable-next-line react-directives/no-undef
    setData(val: object) {
        this.params.userInfo = val;
        return this;
    }

    /**
     * Schedules the local notification for a future time
     */
    schedule() {
        
        PushNotification.localNotificationSchedule(this.params);
      
    }

    /**
     * Displays local notification instantly
     */
    now() {
        PushNotification.localNotification(this.params);
    }

    static builder() {
        return new LocalNotificationBuilder();
    }

    static async getScheduled(): Promise<ILocalNotificationData[]> {
        return new Promise<ILocalNotificationData[]>((resolve) => {
            PushNotification.getScheduledLocalNotifications(resolve);
        });
    }

    static cancelScheduled(id: string) {
        PushNotification.cancelLocalNotifications({id});
    }

    static cancelAllScheduled() {
        PushNotification.cancelAllLocalNotifications();
    }

    static async getScheduledByType(
        type: number
    ): Promise<ILocalNotificationData[]> {
        const notifications = await this.getScheduled();
        return notifications.reduce((acc, item) => {
            // @ts-ignore
            if (item.data.type === type) {
                acc.push(item);
            }
            return acc;
        }, []);
    }
}

export default LocalNotificationBuilder;
