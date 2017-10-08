import * as Thrift from 'thrift';

export enum AccountMigrationCheckType {
    SKIP = 0,
    PINCODE = 1,
    SECURITY_CENTER = 2,
}

export enum AccountMigrationPincodeType {
    NOT_APPLICABLE = 0,
    NOT_SET = 1,
    SET = 2,
    NEED_ENFORCED_INPUT = 3,
}

export enum ApplicationType {
    IOS = 16,
    IOS_RC = 17,
    IOS_BETA = 18,
    IOS_ALPHA = 19,
    ANDROID = 32,
    ANDROID_RC = 33,
    ANDROID_BETA = 34,
    ANDROID_ALPHA = 35,
    WAP = 48,
    WAP_RC = 49,
    WAP_BETA = 50,
    WAP_ALPHA = 51,
    BOT = 64,
    BOT_RC = 65,
    BOT_BETA = 66,
    BOT_ALPHA = 67,
    WEB = 80,
    WEB_RC = 81,
    WEB_BETA = 82,
    WEB_ALPHA = 83,
    DESKTOPWIN = 96,
    DESKTOPWIN_RC = 97,
    DESKTOPWIN_BETA = 98,
    DESKTOPWIN_ALPHA = 99,
    DESKTOPMAC = 112,
    DESKTOPMAC_RC = 113,
    DESKTOPMAC_BETA = 114,
    DESKTOPMAC_ALPHA = 115,
    CHANNELGW = 128,
    CHANNELGW_RC = 129,
    CHANNELGW_BETA = 130,
    CHANNELGW_ALPHA = 131,
    CHANNELCP = 144,
    CHANNELCP_RC = 145,
    CHANNELCP_BETA = 146,
    CHANNELCP_ALPHA = 147,
    WINPHONE = 160,
    WINPHONE_RC = 161,
    WINPHONE_BETA = 162,
    WINPHONE_ALPHA = 163,
    BLACKBERRY = 176,
    BLACKBERRY_RC = 177,
    BLACKBERRY_BETA = 178,
    BLACKBERRY_ALPHA = 179,
    WINMETRO = 192,
    WINMETRO_RC = 193,
    WINMETRO_BETA = 194,
    WINMETRO_ALPHA = 195,
    S40 = 208,
    S40_RC = 209,
    S40_BETA = 210,
    S40_ALPHA = 211,
    CHRONO = 224,
    CHRONO_RC = 225,
    CHRONO_BETA = 226,
    CHRONO_ALPHA = 227,
    TIZEN = 256,
    TIZEN_RC = 257,
    TIZEN_BETA = 258,
    TIZEN_ALPHA = 259,
    VIRTUAL = 272,
    FIREFOXOS = 288,
    FIREFOXOS_RC = 289,
    FIREFOXOS_BETA = 290,
    FIREFOXOS_ALPHA = 291,
    IOSIPAD = 304,
    IOSIPAD_RC = 305,
    IOSIPAD_BETA = 306,
    IOSIPAD_ALPHA = 307,
    BIZIOS = 320,
    BIZIOS_RC = 321,
    BIZIOS_BETA = 322,
    BIZIOS_ALPHA = 323,
    BIZANDROID = 336,
    BIZANDROID_RC = 337,
    BIZANDROID_BETA = 338,
    BIZANDROID_ALPHA = 339,
    BIZBOT = 352,
    BIZBOT_RC = 353,
    BIZBOT_BETA = 354,
    BIZBOT_ALPHA = 355,
    CHROMEOS = 368,
    CHROMEOS_RC = 369,
    CHROMEOS_BETA = 370,
    CHROMEOS_ALPHA = 371,
    ANDROIDLITE = 384,
    ANDROIDLITE_RC = 385,
    ANDROIDLITE_BETA = 386,
    ANDROIDLITE_ALPHA = 387,
    WIN10 = 400,
    WIN10_RC = 401,
    WIN10_BETA = 402,
    WIN10_ALPHA = 403,
    BIZWEB = 416,
    BIZWEB_RC = 417,
    BIZWEB_BETA = 418,
    BIZWEB_ALPHA = 419,
    DUMMYPRIMARY = 432,
    DUMMYPRIMARY_RC = 433,
    DUMMYPRIMARY_BETA = 434,
    DUMMYPRIMARY_ALPHA = 435,
    SQUARE = 448,
    SQUARE_RC = 449,
    SQUARE_BETA = 450,
    SQUARE_ALPHA = 451,
    INTERNAL = 464,
    INTERNAL_RC = 465,
    INTERNAL_BETA = 466,
    INTERNAL_ALPHA = 467,
}

export enum AsymmetricKeyAlgorithm {
    ASYMMETRIC_KEY_ALGORITHM_RSA = 1,
    ASYMMETRIC_KEY_ALGORITHM_ECDH = 2,
}

export enum BeaconNotificationType {
    BUTTON = 1,
    ENTRY_SELECTED = 2,
    BROADCAST_ENTER = 3,
    BROADCAST_LEAVE = 4,
}

export enum BotType {
    RESERVED = 0,
    OFFICIAL = 1,
    LINE_AT_0 = 2,
    LINE_AT = 3,
}

export enum BuddyBannerLinkType {
    BUDDY_BANNER_LINK_HIDDEN = 0,
    BUDDY_BANNER_LINK_MID = 1,
    BUDDY_BANNER_LINK_URL = 2,
}

export enum BuddyCollectionType {
    NORMAL = 0,
    NEW = 1,
    ONAIR = 2,
    POPULAR = 3,
}

export enum BuddyOnAirLabel {
    ON_AIR = 0,
    LIVE = 1,
}

export enum BuddyOnAirType {
    NORMAL = 0,
    VIDEOCAM = 1,
    VOIP = 2,
    RECORD = 3,
}

export enum BuddyProfilePopupType {
    NONE = 0,
    WEB = 1,
}

export enum BuddyResultState {
    ACCEPTED = 1,
    SUCCEEDED = 2,
    FAILED = 3,
    CANCELLED = 4,
    NOTIFY_FAILED = 5,
    STORING = 11,
    UPLOADING = 21,
    NOTIFYING = 31,
    REMOVING_SUBSCRIPTION = 41,
    UNREGISTERING_ACCOUNT = 42,
    NOTIFYING_LEAVE_CHAT = 43,
}

export enum BuddySearchRequestSource {
    NA = 0,
    FRIEND_VIEW = 1,
    OFFICIAL_ACCOUNT_VIEW = 2,
}

export enum BuddyStatusBarDisplayType {
    NOT_A_FRIEND = 0,
    ALWAYS = 1,
}

export enum CarrierCode {
    NOT_SPECIFIED = 0,
    JP_DOCOMO = 1,
    JP_AU = 2,
    JP_SOFTBANK = 3,
    KR_SKT = 17,
    KR_KT = 18,
    KR_LGT = 19,
    JP_DOCOMO_LINE = 4,
}

export enum ChannelConfiguration {
    MESSAGE = 0,
    MESSAGE_NOTIFICATION = 1,
    NOTIFICATION_CENTER = 2,
}

export enum ChannelErrorCode {
    ILLEGAL_ARGUMENT = 0,
    INTERNAL_ERROR = 1,
    CONNECTION_ERROR = 2,
    AUTHENTICATIONI_FAILED = 3,
    NEED_PERMISSION_APPROVAL = 4,
    COIN_NOT_USABLE = 5,
    WEBVIEW_NOT_ALLOWED = 6,
}

export enum ChannelPermission {
    PROFILE = 0,
    FRIENDS = 1,
    GROUP = 2,
}

export enum ChannelSyncTarget {
    ALL = 255,
    CHANNEL_INFO = 1,
    CHANNEL_TOKEN = 2,
    COMMON_DOMAIN = 4,
}

export enum ChannelSyncType {
    SYNC = 0,
    REMOVE = 1,
    REMOVE_ALL = 2,
}

export enum CommitMessageResultCode {
    DELIVERED = 0,
    DELIVERY_SKIPPED = 1,
    DELIVERY_RESTRICTED = 2,
}

export enum ContactAttribute {
    CONTACT_ATTRIBUTE_CAPABLE_VOICE_CALL = 1,
    CONTACT_ATTRIBUTE_CAPABLE_VIDEO_CALL = 2,
    CONTACT_ATTRIBUTE_CAPABLE_MY_HOME = 16,
    CONTACT_ATTRIBUTE_CAPABLE_BUDDY = 32,
}

export enum ContactCategory {
    NORMAL = 0,
    RECOMMEND = 1,
    BLOCKED = 2,
}

export enum ContactRelation {
    ONEWAY = 0,
    BOTH = 1,
    NOT_REGISTERED = 2,
}

export enum ContactSetting {
    CONTACT_SETTING_NOTIFICATION_DISABLE = 1,
    CONTACT_SETTING_DISPLAY_NAME_OVERRIDE = 2,
    CONTACT_SETTING_CONTACT_HIDE = 4,
    CONTACT_SETTING_FAVORITE = 8,
    CONTACT_SETTING_DELETE = 16,
}

export enum ContactStatus {
    UNSPECIFIED = 0,
    FRIEND = 1,
    FRIEND_BLOCKED = 2,
    RECOMMEND = 3,
    RECOMMEND_BLOCKED = 4,
    DELETED = 5,
    DELETED_BLOCKED = 6,
}

export enum ContactType {
    MID = 0,
    PHONE = 1,
    EMAIL = 2,
    USERID = 3,
    PROXIMITY = 4,
    GROUP = 5,
    USER = 6,
    QRCODE = 7,
    PROMOTION_BOT = 8,
    CONTACT_MESSAGE = 9,
    FRIEND_REQUEST = 10,
    REPAIR = 128,
    FACEBOOK = 2305,
    SINA = 2306,
    RENREN = 2307,
    FEIXIN = 2308,
    BBM = 2309,
    BEACON = 11,
}

export enum ContentType {
    NONE = 0,
    IMAGE = 1,
    VIDEO = 2,
    AUDIO = 3,
    HTML = 4,
    PDF = 5,
    CALL = 6,
    STICKER = 7,
    PRESENCE = 8,
    GIFT = 9,
    GROUPBOARD = 10,
    APPLINK = 11,
    LINK = 12,
    CONTACT = 13,
    FILE = 14,
    LOCATION = 15,
    POSTNOTIFICATION = 16,
    RICH = 17,
    CHATEVENT = 18,
    MUSIC = 19,
    PAYMENT = 20,
    EXTIMAGE = 21,
}

export enum CustomMode {
    PROMOTION_FRIENDS_INVITE = 1,
    CAPABILITY_SERVER_SIDE_SMS = 2,
    LINE_CLIENT_ANALYTICS_CONFIGURATION = 3,
}

export enum DeviceBooleanStateKey {
    BEACON_AGREEMENT = 1,
    BLUETOOTH = 2,
}

export enum DeviceStringStateKey {
    LOCATION_OS = 1,
    LOCATION_APP = 2,
}

export enum Diff {
    ADDED = 0,
    UPDATED = 1,
    REMOVED = 2,
}

export enum EmailConfirmationStatus {
    NOT_SPECIFIED = 0,
    NOT_YET = 1,
    DONE = 3,
    NEED_ENFORCED_INPUT = 4,
}

export enum EmailConfirmationType {
    SERVER_SIDE_EMAIL = 0,
    CLIENT_SIDE_EMAIL = 1,
}

export enum ErrorCode {
    ILLEGAL_ARGUMENT = 0,
    AUTHENTICATION_FAILED = 1,
    DB_FAILED = 2,
    INVALID_STATE = 3,
    EXCESSIVE_ACCESS = 4,
    NOT_FOUND = 5,
    INVALID_MID = 9,
    NOT_A_MEMBER = 10,
    INVALID_LENGTH = 6,
    NOT_AVAILABLE_USER = 7,
    NOT_AUTHORIZED_DEVICE = 8,
    NOT_AUTHORIZED_SESSION = 14,
    INCOMPATIBLE_APP_VERSION = 11,
    NOT_READY = 12,
    NOT_AVAILABLE_SESSION = 13,
    SYSTEM_ERROR = 15,
    NO_AVAILABLE_VERIFICATION_METHOD = 16,
    NOT_AUTHENTICATED = 17,
    INVALID_IDENTITY_CREDENTIAL = 18,
    NOT_AVAILABLE_IDENTITY_IDENTIFIER = 19,
    INTERNAL_ERROR = 20,
    NO_SUCH_IDENTITY_IDENFIER = 21,
    DEACTIVATED_ACCOUNT_BOUND_TO_THIS_IDENTITY = 22,
    ILLEGAL_IDENTITY_CREDENTIAL = 23,
    UNKNOWN_CHANNEL = 24,
    NO_SUCH_MESSAGE_BOX = 25,
    NOT_AVAILABLE_MESSAGE_BOX = 26,
    CHANNEL_DOES_NOT_MATCH = 27,
    NOT_YOUR_MESSAGE = 28,
    MESSAGE_DEFINED_ERROR = 29,
    USER_CANNOT_ACCEPT_PRESENTS = 30,
    USER_NOT_STICKER_OWNER = 32,
    MAINTENANCE_ERROR = 33,
    ACCOUNT_NOT_MATCHED = 34,
    ABUSE_BLOCK = 35,
    NOT_FRIEND = 36,
    NOT_ALLOWED_CALL = 37,
    BLOCK_FRIEND = 38,
    INCOMPATIBLE_VOIP_VERSION = 39,
    INVALID_SNS_ACCESS_TOKEN = 40,
    EXTERNAL_SERVICE_NOT_AVAILABLE = 41,
    NOT_ALLOWED_ADD_CONTACT = 42,
    NOT_CERTIFICATED = 43,
    NOT_ALLOWED_SECONDARY_DEVICE = 44,
    INVALID_PIN_CODE = 45,
    NOT_FOUND_IDENTITY_CREDENTIAL = 46,
    EXCEED_FILE_MAX_SIZE = 47,
    EXCEED_DAILY_QUOTA = 48,
    NOT_SUPPORT_SEND_FILE = 49,
    MUST_UPGRADE = 50,
    NOT_AVAILABLE_PIN_CODE_SESSION = 51,
    EXPIRED_REVISION = 52,
    NOT_YET_PHONE_NUMBER = 54,
    BAD_CALL_NUMBER = 55,
    UNAVAILABLE_CALL_NUMBER = 56,
    NOT_SUPPORT_CALL_SERVICE = 57,
    CONGESTION_CONTROL = 58,
    NO_BALANCE = 59,
    NOT_PERMITTED_CALLER_ID = 60,
    NO_CALLER_ID_LIMIT_EXCEEDED = 61,
    CALLER_ID_VERIFICATION_REQUIRED = 62,
    NO_CALLER_ID_LIMIT_EXCEEDED_AND_VERIFICATION_REQUIRED = 63,
    MESSAGE_NOT_FOUND = 64,
    INVALID_ACCOUNT_MIGRATION_PINCODE_FORMAT = 65,
    ACCOUNT_MIGRATION_PINCODE_NOT_MATCHED = 66,
    ACCOUNT_MIGRATION_PINCODE_BLOCKED = 67,
    INVALID_PASSWORD_FORMAT = 69,
    FEATURE_RESTRICTED = 70,
    MESSAGE_NOT_DESTRUCTIBLE = 71,
    PAID_CALL_REDEEM_FAILED = 72,
    PREVENTED_JOIN_BY_TICKET = 73,
    SEND_MESSAGE_NOT_PERMITTED_FROM_LINE_AT = 75,
    SEND_MESSAGE_NOT_PERMITTED_WHILE_AUTO_REPLY = 76,
    SECURITY_CENTER_NOT_VERIFIED = 77,
    SECURITY_CENTER_BLOCKED_BY_SETTING = 78,
    SECURITY_CENTER_BLOCKED = 79,
    TALK_PROXY_EXCEPTION = 80,
    E2EE_INVALID_PROTOCOL = 81,
    E2EE_RETRY_ENCRYPT = 82,
    E2EE_UPDATE_SENDER_KEY = 83,
    E2EE_UPDATE_RECEIVER_KEY = 84,
    E2EE_INVALID_ARGUMENT = 85,
    E2EE_INVALID_VERSION = 86,
    E2EE_SENDER_DISABLED = 87,
    E2EE_RECEIVER_DISABLED = 88,
    E2EE_SENDER_NOT_ALLOWED = 89,
    E2EE_RECEIVER_NOT_ALLOWED = 90,
    E2EE_RESEND_FAIL = 91,
    E2EE_RESEND_OK = 92,
    HITOKOTO_BACKUP_NO_AVAILABLE_DATA = 93,
    E2EE_UPDATE_PRIMARY_DEVICE = 94,
    SUCCESS = 95,
    CANCEL = 96,
    E2EE_PRIMARY_NOT_SUPPORT = 97,
    E2EE_RETRY_PLAIN = 98,
    E2EE_RECREATE_GROUP_KEY = 99,
    E2EE_GROUP_TOO_MANY_MEMBERS = 100,
    SERVER_BUSY = 101,
    NOT_ALLOWED_ADD_FOLLOW = 102,
    INCOMING_FRIEND_REQUEST_LIMIT = 103,
    OUTGOING_FRIEND_REQUEST_LIMIT = 104,
    OUTGOING_FRIEND_REQUEST_QUOTA = 105,
    DUPLICATED = 106,
    BANNED = 107,
}

export enum ExtendedProfileAttribute {
}

export enum FeatureType {
    OBS_VIDEO = 1,
    OBS_GENERAL = 2,
}

export enum FriendRequestDirection {
    INCOMING = 1,
    OUTGOING = 2,
}

export enum FriendRequestMethod {
    TIMELINE = 1,
    NEARBY = 2,
    SQUARE = 3,
}

export enum FriendRequestStatus {
    NONE = 0,
    AVAILABLE = 1,
    ALREADY_REQUESTED = 2,
    UNAVAILABLE = 3,
}

export enum GroupAttribute {
    ALL = 255,
    NAME = 1,
    PICTURE_STATUS = 2,
    PREVENTED_JOIN_BY_TICKET = 4,
    NOTIFICATION_SETTING = 8,
}

export enum GroupCallMediaType {
    AUDIO = 1,
    VIDEO = 2,
}

export enum GroupPreferenceAttribute {
    INVITATION_TICKET = 1,
    FAVORITE_TIMESTAMP = 2,
}

export enum IdentityProvider {
    UNKNOWN = 0,
    LINE = 1,
    NAVER_KR = 2,
    LINE_PHONE = 3,
}

export enum LoginResultType {
    SUCCESS = 1,
    REQUIRE_QRCODE = 2,
    REQUIRE_DEVICE_CONFIRM = 3,
    REQUIRE_SMS_CONFIRM = 4,
}

export enum LoginType {
    ID_CREDENTIAL = 0,
    QRCODE = 1,
    ID_CREDENTIAL_WITH_E2EE = 2,
}

export enum MessageRelationType {
    FORWARD = 0,
    AUTO_REPLY = 1,
    SUBORDINATE = 2,
}

export enum MIDType {
    USER = 0,
    ROOM = 1,
    GROUP = 2,
    SQUARE = 3,
    SQUARE_CHAT = 4,
    SQUARE_MEMBER = 5,
}

export enum ModificationType {
    ADD = 0,
    REMOVE = 1,
    MODIFY = 2,
}

export enum NotificationItemFetchMode {
    ALL = 0,
    APPEND = 1,
}

export enum NotificationStatus {
    NOTIFICATION_ITEM_EXIST = 1,
    TIMELINE_ITEM_EXIST = 2,
    NOTE_GROUP_NEW_ITEM_EXIST = 4,
    TIMELINE_BUDDYGROUP_CHANGED = 8,
    NOTE_ONE_TO_ONE_NEW_ITEM_EXIST = 16,
    ALBUM_ITEM_EXIST = 32,
    TIMELINE_ITEM_DELETED = 64,
    OTOGROUP_ITEM_EXIST = 128,
    GROUPHOME_NEW_ITEM_EXIST = 256,
    GROUPHOME_HIDDEN_ITEM_CHANGED = 512,
    NOTIFICATION_ITEM_CHANGED = 1024,
    BEAD_ITEM_HIDE = 2048,
    BEAD_ITEM_SHOW = 4096,
}

export enum NotificationType {
    APPLE_APNS = 1,
    GOOGLE_C2DM = 2,
    NHN_NNI = 3,
    SKT_AOM = 4,
    MS_MPNS = 5,
    RIM_BIS = 6,
    GOOGLE_GCM = 7,
    NOKIA_NNAPI = 8,
    TIZEN = 9,
    MOZILLA_SIMPLE = 10,
    LINE_BOT = 17,
    LINE_WAP = 18,
    APPLE_APNS_VOIP = 19,
    MS_WNS = 20,
}

export enum OpStatus {
    NORMAL = 0,
    ALERT_DISABLED = 1,
    ALWAYS = 2,
}

export enum OpType {
    END_OF_OPERATION = 0,
    UPDATE_PROFILE = 1,
    UPDATE_SETTINGS = 36,
    NOTIFIED_UPDATE_PROFILE = 2,
    REGISTER_USERID = 3,
    ADD_CONTACT = 4,
    NOTIFIED_ADD_CONTACT = 5,
    BLOCK_CONTACT = 6,
    UNBLOCK_CONTACT = 7,
    NOTIFIED_RECOMMEND_CONTACT = 8,
    CREATE_GROUP = 9,
    UPDATE_GROUP = 10,
    NOTIFIED_UPDATE_GROUP = 11,
    INVITE_INTO_GROUP = 12,
    NOTIFIED_INVITE_INTO_GROUP = 13,
    CANCEL_INVITATION_GROUP = 31,
    NOTIFIED_CANCEL_INVITATION_GROUP = 32,
    LEAVE_GROUP = 14,
    NOTIFIED_LEAVE_GROUP = 15,
    ACCEPT_GROUP_INVITATION = 16,
    NOTIFIED_ACCEPT_GROUP_INVITATION = 17,
    REJECT_GROUP_INVITATION = 34,
    NOTIFIED_REJECT_GROUP_INVITATION = 35,
    KICKOUT_FROM_GROUP = 18,
    NOTIFIED_KICKOUT_FROM_GROUP = 19,
    CREATE_ROOM = 20,
    INVITE_INTO_ROOM = 21,
    NOTIFIED_INVITE_INTO_ROOM = 22,
    LEAVE_ROOM = 23,
    NOTIFIED_LEAVE_ROOM = 24,
    SEND_MESSAGE = 25,
    RECEIVE_MESSAGE = 26,
    SEND_MESSAGE_RECEIPT = 27,
    RECEIVE_MESSAGE_RECEIPT = 28,
    SEND_CONTENT_RECEIPT = 29,
    SEND_CHAT_CHECKED = 40,
    SEND_CHAT_REMOVED = 41,
    RECEIVE_ANNOUNCEMENT = 30,
    INVITE_VIA_EMAIL = 38,
    NOTIFIED_REGISTER_USER = 37,
    NOTIFIED_UNREGISTER_USER = 33,
    NOTIFIED_REQUEST_RECOVERY = 39,
    NOTIFIED_FORCE_SYNC = 42,
    SEND_CONTENT = 43,
    SEND_MESSAGE_MYHOME = 44,
    NOTIFIED_UPDATE_CONTENT_PREVIEW = 45,
    REMOVE_ALL_MESSAGES = 46,
    NOTIFIED_UPDATE_PURCHASES = 47,
    DUMMY = 48,
    UPDATE_CONTACT = 49,
    NOTIFIED_RECEIVED_CALL = 50,
    CANCEL_CALL = 51,
    NOTIFIED_REDIRECT = 52,
    NOTIFIED_CHANNEL_SYNC = 53,
    FAILED_SEND_MESSAGE = 54,
    NOTIFIED_READ_MESSAGE = 55,
    FAILED_EMAIL_CONFIRMATION = 56,
    NOTIFIED_PUSH_NOTICENTER_ITEM = 59,
    NOTIFIED_CHAT_CONTENT = 58,
    NOTIFIED_JOIN_CHAT = 60,
    NOTIFIED_LEAVE_CHAT = 61,
    NOTIFIED_TYPING = 62,
    FRIEND_REQUEST_ACCEPTED = 63,
    DESTROY_MESSAGE = 64,
    NOTIFIED_DESTROY_MESSAGE = 65,
    UPDATE_PUBLICKEYCHAIN = 66,
    NOTIFIED_UPDATE_PUBLICKEYCHAIN = 67,
    NOTIFIED_BLOCK_CONTACT = 68,
    NOTIFIED_UNBLOCK_CONTACT = 69,
    UPDATE_GROUPPREFERENCE = 70,
    NOTIFIED_PAYMENT_EVENT = 71,
    REGISTER_E2EE_PUBLICKEY = 72,
    NOTIFIED_E2EE_KEY_EXCHANGE_REQ = 73,
    NOTIFIED_E2EE_KEY_EXCHANGE_RESP = 74,
    NOTIFIED_E2EE_MESSAGE_RESEND_REQ = 75,
    NOTIFIED_E2EE_MESSAGE_RESEND_RESP = 76,
    NOTIFIED_E2EE_KEY_UPDATE = 77,
    NOTIFIED_BUDDY_UPDATE_PROFILE = 78,
    NOTIFIED_UPDATE_LINEAT_TABS = 79,
    UPDATE_ROOM = 80,
    NOTIFIED_BEACON_DETECTED = 81,
    UPDATE_EXTENDED_PROFILE = 82,
    ADD_FOLLOW = 83,
    NOTIFIED_ADD_FOLLOW = 84,
    DELETE_FOLLOW = 85,
    NOTIFIED_DELETE_FOLLOW = 86,
    UPDATE_TIMELINE_SETTINGS = 87,
    NOTIFIED_FRIEND_REQUEST = 88,
    UPDATE_RINGBACK_TONE = 89,
    NOTIFIED_POSTBACK = 90,
    RECEIVE_READ_WATERMARK = 91,
    NOTIFIED_MESSAGE_DELIVERED = 92,
}

export enum PaidCallerIdStatus {
    NOT_SPECIFIED = 0,
    VALID = 1,
    VERIFICATION_REQUIRED = 2,
    NOT_PERMITTED = 3,
    LIMIT_EXCEEDED = 4,
    LIMIT_EXCEEDED_AND_VERIFICATION_REQUIRED = 5,
}

export enum PaidCallProductType {
    COIN = 0,
    CREDIT = 1,
    MONTHLY = 2,
}

export enum PaidCallType {
    OUT = 0,
    IN = 1,
    TOLLFREE = 2,
    RECORD = 3,
    AD = 4,
    CS = 5,
}

export enum PayloadType {
    PAYLOAD_BUY = 101,
    PAYLOAD_CS = 111,
    PAYLOAD_BONUS = 121,
    PAYLOAD_EVENT = 131,
    PAYLOAD_POINT_AUTO_EXCHANGED = 141,
    PAYLOAD_POINT_MANUAL_EXCHANGED = 151,
}

export enum PaymentPgType {
    PAYMENT_PG_NONE = 0,
    PAYMENT_PG_AU = 1,
    PAYMENT_PG_AL = 2,
}

export enum PaymentType {
    PAYMENT_APPLE = 1,
    PAYMENT_GOOGLE = 2,
}

export enum PersonalInfo {
    EMAIL = 0,
    PHONE = 1,
    BIRTHDAY = 2,
    RAW_BIRTHDAY = 3,
}

export enum PlaceSearchProvider {
    GOOGLE = 0,
    BAIDU = 1,
}

export enum PointErrorCode {
    REQUEST_DUPLICATION = 3001,
    INVALID_PARAMETER = 3002,
    NOT_ENOUGH_BALANCE = 3003,
    AUTHENTICATION_FAIL = 3004,
    API_ACCESS_FORBIDDEN = 3005,
    MEMBER_ACCOUNT_NOT_FOUND = 3006,
    SERVICE_ACCOUNT_NOT_FOUND = 3007,
    TRANSACTION_NOT_FOUND = 3008,
    ALREADY_REVERSED_TRANSACTION = 3009,
    MESSAGE_NOT_READABLE = 3010,
    HTTP_REQUEST_METHOD_NOT_SUPPORTED = 3011,
    HTTP_MEDIA_TYPE_NOT_SUPPORTED = 3012,
    NOT_ALLOWED_TO_DEPOSIT = 3013,
    NOT_ALLOWED_TO_PAY = 3014,
    TRANSACTION_ACCESS_FORBIDDEN = 3015,
    INVALID_SERVICE_CONFIGURATION = 4001,
    DCS_COMMUNICATION_FAIL = 5004,
    UPDATE_BALANCE_FAIL = 5007,
    SYSTEM_ERROR = 5999,
    SYSTEM_MAINTENANCE = 5888,
}

export enum PrivacyLevelType {
    PUBLIC = 0,
    PRIVATE = 1,
}

export enum ProductBannerLinkType {
    BANNER_LINK_NONE = 0,
    BANNER_LINK_ITEM = 1,
    BANNER_LINK_URL = 2,
    BANNER_LINK_CATEGORY = 3,
}

export enum ProductEventType {
    NO_EVENT = 0,
    CARRIER_ANY = 65537,
    BUDDY_ANY = 131073,
    INSTALL_IOS = 196609,
    INSTALL_ANDROID = 196610,
    MISSION_ANY = 262145,
    MUSTBUY_ANY = 327681,
}

export enum ProfileAttribute {
    ALL = 511,
    EMAIL = 1,
    DISPLAY_NAME = 2,
    PHONETIC_NAME = 4,
    PICTURE = 8,
    STATUS_MESSAGE = 16,
    ALLOW_SEARCH_BY_USERID = 32,
    ALLOW_SEARCH_BY_EMAIL = 64,
    BUDDY_STATUS = 128,
    MUSIC_PROFILE = 256,
}

export enum PublicKeychainStatus {
    UPDATED = 0,
    DELETED = 1,
    RESTRICTED = 2,
}

export enum PublicType {
    HIDDEN = 0,
    PUBLIC = 1000,
}

export enum RedirectType {
    NONE = 0,
    EXPIRE_SECOND = 1,
}

export enum RegistrationType {
    PHONE = 0,
    EMAIL_WAP = 1,
    FACEBOOK = 2305,
    SINA = 2306,
    RENREN = 2307,
    FEIXIN = 2308,
}

export enum ReportCategory {
    PUSH_NORMAL_PLAIN = 0,
    PUSH_NORMAL_E2EE = 1,
    PUSH_VOIP_PLAIN = 2,
    PUSH_VOIP_E2EE = 3,
}

export enum ReservedMessageSessionId {
    DEFAULT = 0,
    HIDDEN_CHAT = 1,
}

export enum RoomAttribute {
    ALL = 255,
    NOTIFICATION_SETTING = 1,
}

export enum SecurityCenterSettingsType {
    NOT_APPLICABLE = 0,
    NOT_SET = 1,
    SET = 2,
    NEED_ENFORCED_INPUT = 3,
}

export enum ServiceCode {
    UNKNOWN = 0,
    TALK = 1,
    SQUARE = 2,
}

export enum SettingsAttribute {
    NOTIFICATION_ENABLE = 1,
    NOTIFICATION_MUTE_EXPIRATION = 2,
    NOTIFICATION_NEW_MESSAGE = 4,
    NOTIFICATION_GROUP_INVITATION = 8,
    NOTIFICATION_SHOW_MESSAGE = 16,
    NOTIFICATION_INCOMING_CALL = 32,
    NOTIFICATION_SOUND_MESSAGE = 256,
    NOTIFICATION_SOUND_GROUP = 512,
    NOTIFICATION_DISABLED_WITH_SUB = 65536,
    NOTIFICATION_PAYMENT = 131072,
    PRIVACY_SYNC_CONTACTS = 64,
    PRIVACY_SEARCH_BY_PHONE_NUMBER = 128,
    PRIVACY_SEARCH_BY_USERID = 8192,
    PRIVACY_SEARCH_BY_EMAIL = 16384,
    PRIVACY_ALLOW_SECONDARY_DEVICE_LOGIN = 2097152,
    PRIVACY_PROFILE_IMAGE_POST_TO_MYHOME = 8388608,
    PRIVACY_ALLOW_FRIEND_REQUEST = 1073741824,
    PRIVACY_RECV_MESSAGES_FROM_NOT_FRIEND = 33554432,
    PRIVACY_AGREE_USE_LINECOIN_TO_PAIDCALL = 67108864,
    PRIVACY_AGREE_USE_PAIDCALL = 134217728,
    CONTACT_MY_TICKET = 1024,
    IDENTITY_PROVIDER = 2048,
    IDENTITY_IDENTIFIER = 4096,
    SNS_ACCOUNT = 524288,
    PHONE_REGISTRATION = 1048576,
    PREFERENCE_LOCALE = 32768,
    CUSTOM_MODE = 4194304,
    EMAIL_CONFIRMATION_STATUS = 16777216,
    ACCOUNT_MIGRATION_PINCODE = 268435456,
    ENFORCED_INPUT_ACCOUNT_MIGRATION_PINCODE = 536870912,
    SECURITY_CENTER_SETTINGS = 262144,
}

export enum SettingsAttributeEx {
    NOTIFICATION_ENABLE = 0,
    NOTIFICATION_MUTE_EXPIRATION = 1,
    NOTIFICATION_NEW_MESSAGE = 2,
    NOTIFICATION_GROUP_INVITATION = 3,
    NOTIFICATION_SHOW_MESSAGE = 4,
    NOTIFICATION_INCOMING_CALL = 5,
    NOTIFICATION_SOUND_MESSAGE = 8,
    NOTIFICATION_SOUND_GROUP = 9,
    NOTIFICATION_DISABLED_WITH_SUB = 16,
    NOTIFICATION_PAYMENT = 17,
    NOTIFICATION_MENTION = 40,
    PRIVACY_SYNC_CONTACTS = 6,
    PRIVACY_SEARCH_BY_PHONE_NUMBER = 7,
    PRIVACY_SEARCH_BY_USERID = 13,
    PRIVACY_SEARCH_BY_EMAIL = 14,
    PRIVACY_ALLOW_SECONDARY_DEVICE_LOGIN = 21,
    PRIVACY_PROFILE_IMAGE_POST_TO_MYHOME = 23,
    PRIVACY_PROFILE_MUSIC_POST_TO_MYHOME = 35,
    PRIVACY_ALLOW_FRIEND_REQUEST = 30,
    PRIVACY_RECV_MESSAGES_FROM_NOT_FRIEND = 25,
    PRIVACY_AGREE_USE_LINECOIN_TO_PAIDCALL = 26,
    PRIVACY_AGREE_USE_PAIDCALL = 27,
    CONTACT_MY_TICKET = 10,
    IDENTITY_PROVIDER = 11,
    IDENTITY_IDENTIFIER = 12,
    SNS_ACCOUNT = 19,
    PHONE_REGISTRATION = 20,
    PREFERENCE_LOCALE = 15,
    CUSTOM_MODE = 22,
    EMAIL_CONFIRMATION_STATUS = 24,
    ACCOUNT_MIGRATION_PINCODE = 28,
    ENFORCED_INPUT_ACCOUNT_MIGRATION_PINCODE = 29,
    SECURITY_CENTER_SETTINGS = 18,
    E2EE_ENABLE = 33,
    HITOKOTO_BACKUP_REQUESTED = 34,
    CONTACT_ALLOW_FOLLOWING = 36,
    PRIVACY_ALLOW_NEARBY = 37,
    AGREEMENT_NEARBY = 38,
    AGREEMENT_SQUARE = 39,
    ALLOW_UNREGISTRATION_SECONDARY_DEVICE = 41,
    AGREEMENT_BOT_USE = 42,
}

export enum SnsIdType {
    FACEBOOK = 1,
    SINA = 2,
    RENREN = 3,
    FEIXIN = 4,
    BBM = 5,
}

export enum SpammerReason {
    OTHER = 0,
    ADVERTISING = 1,
    GENDER_HARASSMENT = 2,
    HARASSMENT = 3,
}

export enum SpotCategory {
    UNKNOWN = 0,
    GOURMET = 1,
    BEAUTY = 2,
    TRAVEL = 3,
    SHOPPING = 4,
    ENTERTAINMENT = 5,
    SPORTS = 6,
    TRANSPORT = 7,
    LIFE = 8,
    HOSPITAL = 9,
    FINANCE = 10,
    EDUCATION = 11,
    OTHER = 12,
    ALL = 10000,
}

export enum StickerResourceType {
    STATIC = 1,
    ANIMATION = 2,
    SOUND = 3,
    ANIMATION_SOUND = 4,
    POPUP = 5,
    POPUP_SOUND = 6,
}

export enum SuggestDictionaryIncrementStatus {
    SUCCESS = 0,
    INVALID_REVISION = 1,
    TOO_LARGE_DATA = 2,
    SCHEME_CHANGED = 3,
    RETRY = 4,
    FAIL = 5,
    TOO_OLD_DATA = 6,
}

export enum SyncActionType {
    SYNC = 0,
    REPORT = 1,
}

export enum SyncCategory {
    PROFILE = 0,
    SETTINGS = 1,
    OPS = 2,
    CONTACT = 3,
    RECOMMEND = 4,
    BLOCK = 5,
    GROUP = 6,
    ROOM = 7,
    NOTIFICATION = 8,
    ADDRESS_BOOK = 9,
}

export enum SyncTriggerReason {
    OTHER = 0,
    REVISION_GAP_TOO_LARGE = 1,
    OPERATION_EXPIRED = 2,
}

export enum TMessageBoxStatus {
    ACTIVATED = 1,
    UNREAD = 2,
}

export enum TrackingType {
}

export enum UnregistrationReason {
    UNREGISTRATION_REASON_UNREGISTER_USER = 1,
    UNREGISTRATION_REASON_UNBIND_DEVICE = 2,
}

export enum UserAgeType {
    OVER = 1,
    UNDER = 2,
    UNDEFINED = 3,
}

export enum UserStatus {
    NORMAL = 0,
    UNBOUND = 1,
    UNREGISTERED = 2,
}

export enum VerificationMethod {
    NO_AVAILABLE = 0,
    PIN_VIA_SMS = 1,
    CALLERID_INDIGO = 2,
    PIN_VIA_TTS = 4,
    SKIP = 10,
}

export enum VerificationResult {
    FAILED = 0,
    OK_NOT_REGISTERED_YET = 1,
    OK_REGISTERED_WITH_SAME_DEVICE = 2,
    OK_REGISTERED_WITH_ANOTHER_DEVICE = 3,
}

export enum WapInvitationType {
    REGISTRATION = 1,
    CHAT = 2,
}

export class AgeCheckDocomoResult {
    authUrl: string;
    userAgeType: UserAgeType;

    constructor(args?: { authUrl: string; userAgeType: UserAgeType; });
}

export class AgeCheckRequestResult {
    authUrl: string;
    sessionId: string;

    constructor(args?: { authUrl: string; sessionId: string; });
}

export class AnalyticsInfo {
    gaSamplingRate: number;
    tmid: string;

    constructor(args?: { gaSamplingRate: number; tmid: string; });
}

export class Announcement {
    index: number;
    forceUpdate: boolean;
    title: string;
    text: string;
    createdTime: number;
    pictureUrl: string;
    thumbnailUrl: string;

    constructor(args?: { index: number; forceUpdate: boolean; title: string; text: string; createdTime: number; pictureUrl: string; thumbnailUrl: string; });
}

export class ApprovedChannelInfo {
    channelInfo: ChannelInfo;
    approvedAt: number;

    constructor(args?: { channelInfo: ChannelInfo; approvedAt: number; });
}

export class ApprovedChannelInfos {
    approvedChannelInfos: ApprovedChannelInfo[];
    revision: number;

    constructor(args?: { approvedChannelInfos: ApprovedChannelInfo[]; revision: number; });
}

export class AuthQrcode {
    qrcode: string;
    verifier: string;
    callbackUrl: string;

    constructor(args?: { qrcode: string; verifier: string; callbackUrl: string; });
}

export class Balance {
    currentPointsFixedPointDecimal: string;

    constructor(args?: { currentPointsFixedPointDecimal: string; });
}

export class BanPage {
    url: string;

    constructor(args?: { url: string; });
}

export class BeaconBackgroundNotification {
    actionInterval: number;
    actionAndConditions: BeaconCondition[];
    actionDelay: number;
    actionConditions: BeaconCondition[][];

    constructor(args?: { actionInterval: number; actionAndConditions: BeaconCondition[]; actionDelay: number; actionConditions: BeaconCondition[][]; });
}

export class BeaconCondition {
    inFriends: string;
    notInFriends: string;
    termsAgreed: boolean;

    constructor(args?: { inFriends: string; notInFriends: string; termsAgreed: boolean; });
}

export class BeaconLayerInfoAndActions {
    pictureUrl: string;
    label: string;
    text: string;
    actions: string[];
    showOrConditions: BeaconCondition[];
    showConditions: BeaconCondition[][];
    timeToHide: number;

    constructor(args?: { pictureUrl: string; label: string; text: string; actions: string[]; showOrConditions: BeaconCondition[]; showConditions: BeaconCondition[][]; timeToHide: number; });
}

export class BeaconQueryResponse {
    deprecated_actionUrls: string[];
    cacheTtl: number;
    touchActions: BeaconTouchActions;
    layerInfoAndActions: BeaconLayerInfoAndActions;
    backgroundEnteringNotification: BeaconBackgroundNotification;
    backgroundLeavingNotification: BeaconBackgroundNotification;
    group: string;
    major: string;
    minor: string;
    effectiveRange: number;
    channelWhiteList: string[];

    constructor(args?: { deprecated_actionUrls: string[]; cacheTtl: number; touchActions: BeaconTouchActions; layerInfoAndActions: BeaconLayerInfoAndActions; backgroundEnteringNotification: BeaconBackgroundNotification; backgroundLeavingNotification: BeaconBackgroundNotification; group: string; major: string; minor: string; effectiveRange: number; channelWhiteList: string[]; });
}

export class BeaconTouchActions {
    actions: string[];

    constructor(args?: { actions: string[]; });
}

export class BotUseInfo {
    botUseAgreementAccepted: boolean;
    botInFriends: boolean;
    primaryApplication: string;
    locale: string;

    constructor(args?: { botUseAgreementAccepted: boolean; botInFriends: boolean; primaryApplication: string; locale: string; });
}

export class BuddyBanner {
    buddyBannerLinkType: BuddyBannerLinkType;
    buddyBannerLink: string;
    buddyBannerImageUrl: string;
    width: number;
    height: number;
    bannerId: number;

    constructor(args?: { buddyBannerLinkType: BuddyBannerLinkType; buddyBannerLink: string; buddyBannerImageUrl: string; width: number; height: number; bannerId: number; });
}

export class BuddyCategoryEntry {
    classification: string;
    displayName: string;
    totalBuddyCount: number;

    constructor(args?: { classification: string; displayName: string; totalBuddyCount: number; });
}

export class BuddyCategoryView {
    categoryEntries: BuddyCategoryEntry[];

    constructor(args?: { categoryEntries: BuddyCategoryEntry[]; });
}

export class BuddyChatBar {
    barItems: BuddyChatBarItem[];

    constructor(args?: { barItems: BuddyChatBarItem[]; });
}

export class BuddyChatBarItem {
    rich: BuddyRichMenuChatBarItem;
    widgetList: BuddyWidgetListCharBarItem;
    web: BuddyWebChatBarItem;

    constructor(args?: { rich: BuddyRichMenuChatBarItem; widgetList: BuddyWidgetListCharBarItem; web: BuddyWebChatBarItem; });
}

export class BuddyCollection {
    code: number;
    displayName: string;
    totalBuddyCount: number;
    entries: BuddyCollectionEntry[];
    horizontal: boolean;
    type: BuddyCollectionType;

    constructor(args?: { code: number; displayName: string; totalBuddyCount: number; entries: BuddyCollectionEntry[]; horizontal: boolean; type: BuddyCollectionType; });
}

export class BuddyCollectionEntry {
    contact: Contact;
    onAir: boolean;
    asNew: boolean;

    constructor(args?: { contact: Contact; onAir: boolean; asNew: boolean; });
}

export class BuddyDetail {
    mid: string;
    memberCount: number;
    onAir: boolean;
    businessAccount: boolean;
    addable: boolean;
    acceptableContentTypes: ContentType[];
    capableMyhome: boolean;
    freePhoneCallable: boolean;
    phoneNumberToDial: string;
    needPermissionApproval: boolean;
    channelId: number;
    channelProviderName: string;
    iconType: number;
    botType: BotType;
    showRichMenu: boolean;
    richMenuRevision: number;
    onAirLabel: BuddyOnAirLabel;
    useTheme: boolean;
    themeId: string;
    useBar: boolean;
    barRevision: number;
    useBackground: boolean;
    backgroundId: string;
    statusBarEnabled: boolean;
    statusBarRevision: number;
    capableChat: boolean;

    constructor(args?: { mid: string; memberCount: number; onAir: boolean; businessAccount: boolean; addable: boolean; acceptableContentTypes: ContentType[]; capableMyhome: boolean; freePhoneCallable: boolean; phoneNumberToDial: string; needPermissionApproval: boolean; channelId: number; channelProviderName: string; iconType: number; botType: BotType; showRichMenu: boolean; richMenuRevision: number; onAirLabel: BuddyOnAirLabel; useTheme: boolean; themeId: string; useBar: boolean; barRevision: number; useBackground: boolean; backgroundId: string; statusBarEnabled: boolean; statusBarRevision: number; capableChat: boolean; });
}

export class BuddyList {
    classification: string;
    displayName: string;
    totalBuddyCount: number;
    popularContacts: Contact[];

    constructor(args?: { classification: string; displayName: string; totalBuddyCount: number; popularContacts: Contact[]; });
}

export class BuddyMessageRequest {
    contentType: ContentType;
    text: string;
    location: Location;
    content: string;
    contentMetadata: { [k: string]: string; };
    sourceContentId: string;
    usePermanent: boolean;
    toMid: string;

    constructor(args?: { contentType: ContentType; text: string; location: Location; content: string; contentMetadata: { [k: string]: string; }; sourceContentId: string; usePermanent: boolean; toMid: string; });
}

export class BuddyNewsEntry {
    banner: BuddyBanner;
    contact: Contact;
    memberCount: number;
    subtitle: string;
    releasedTime: number;
    newsId: number;

    constructor(args?: { banner: BuddyBanner; contact: Contact; memberCount: number; subtitle: string; releasedTime: number; newsId: number; });
}

export class BuddyNewsView {
    hasNext: boolean;
    newsEntries: BuddyNewsEntry[];

    constructor(args?: { hasNext: boolean; newsEntries: BuddyNewsEntry[]; });
}

export class BuddyOnAir {
    mid: string;
    freshnessLifetime: number;
    onAirId: string;
    onAir: boolean;
    text: string;
    viewerCount: number;
    targetCount: number;
    livePlayTime: number;
    screenAspectRate: string;
    onAirType: BuddyOnAirType;
    onAirUrls: BuddyOnAirUrls;
    aspectRatioOfSource: string;
    useFadingOut: boolean;
    fadingOutIn: number;
    urlAfterFadingOut: string;
    labelAfterFadingOut: string;
    useLowerBanner: boolean;
    lowerBannerUrl: string;
    lowerBannerLabel: string;

    constructor(args?: { mid: string; freshnessLifetime: number; onAirId: string; onAir: boolean; text: string; viewerCount: number; targetCount: number; livePlayTime: number; screenAspectRate: string; onAirType: BuddyOnAirType; onAirUrls: BuddyOnAirUrls; aspectRatioOfSource: string; useFadingOut: boolean; fadingOutIn: number; urlAfterFadingOut: string; labelAfterFadingOut: string; useLowerBanner: boolean; lowerBannerUrl: string; lowerBannerLabel: string; });
}

export class BuddyOnAirUrls {
    hls: { [k: string]: string; };
    smoothStreaming: { [k: string]: string; };

    constructor(args?: { hls: { [k: string]: string; }; smoothStreaming: { [k: string]: string; }; });
}

export class BuddyProfile {
    buddyId: string;
    mid: string;
    searchId: string;
    displayName: string;
    statusMessage: string;
    contactCount: number;

    constructor(args?: { buddyId: string; mid: string; searchId: string; displayName: string; statusMessage: string; contactCount: number; });
}

export class BuddyProfilePopup {
    popupType: BuddyProfilePopupType;
    linkUrl: string;
    backgroundColorRgb: number;
    textColorRgb: number;
    label: string;

    constructor(args?: { popupType: BuddyProfilePopupType; linkUrl: string; backgroundColorRgb: number; textColorRgb: number; label: string; });
}

export class BuddyRichMenuChatBarItem {
    label: string;
    body: string;
    selected: boolean;

    constructor(args?: { label: string; body: string; selected: boolean; });
}

export class BuddyRichMenuContents {
    body: string;

    constructor(args?: { body: string; });
}

export class BuddySearchResult {
    mid: string;
    displayName: string;
    pictureStatus: string;
    picturePath: string;
    statusMessage: string;
    businessAccount: boolean;
    iconType: number;
    botType: BotType;

    constructor(args?: { mid: string; displayName: string; pictureStatus: string; picturePath: string; statusMessage: string; businessAccount: boolean; iconType: number; botType: BotType; });
}

export class BuddyStatusBar {
    label: string;
    displayType: BuddyStatusBarDisplayType;

    constructor(args?: { label: string; displayType: BuddyStatusBarDisplayType; });
}

export class BuddyTopView {
    banners: BuddyBanner[];
    collections: BuddyCollection[];
    rotationInterval: number;

    constructor(args?: { banners: BuddyBanner[]; collections: BuddyCollection[]; rotationInterval: number; });
}

export class BuddyWebChatBarItem {
    label: string;
    url: string;

    constructor(args?: { label: string; url: string; });
}

export class BuddyWidget {
    icon: string;
    label: string;
    url: string;

    constructor(args?: { icon: string; label: string; url: string; });
}

export class BuddyWidgetListCharBarItem {
    label: string;
    widgets: BuddyWidget[];
    selected: boolean;

    constructor(args?: { label: string; widgets: BuddyWidget[]; selected: boolean; });
}

export class CallHost {
    host: string;
    port: number;
    zone: string;

    constructor(args?: { host: string; port: number; zone: string; });
}

export class ChannelDomain {
    host: string;
    removed: boolean;

    constructor(args?: { host: string; removed: boolean; });
}

export class ChannelDomains {
    channelDomains: ChannelDomain[];
    revision: number;

    constructor(args?: { channelDomains: ChannelDomain[]; revision: number; });
}

export class ChannelException extends Thrift.TException {
    code: ChannelErrorCode;
    reason: string;
    parameterMap: { [k: string]: string; };

    constructor(args?: { code: ChannelErrorCode; reason: string; parameterMap: { [k: string]: string; }; });
}

export class ChannelIdWithLastUpdated {
    channelId: string;
    lastUpdated: number;

    constructor(args?: { channelId: string; lastUpdated: number; });
}

export class ChannelInfo {
    channelId: string;
    name: string;
    entryPageUrl: string;
    descriptionText: string;
    provider: ChannelProvider;
    publicType: PublicType;
    iconImage: string;
    permissions: string[];
    iconThumbnailImage: string;
    channelConfigurations: ChannelConfiguration[];
    lcsAllApiUsable: boolean;
    allowedPermissions: ChannelPermission[];
    channelDomains: ChannelDomain[];
    updatedTimestamp: number;

    constructor(args?: { channelId: string; name: string; entryPageUrl: string; descriptionText: string; provider: ChannelProvider; publicType: PublicType; iconImage: string; permissions: string[]; iconThumbnailImage: string; channelConfigurations: ChannelConfiguration[]; lcsAllApiUsable: boolean; allowedPermissions: ChannelPermission[]; channelDomains: ChannelDomain[]; updatedTimestamp: number; });
}

export class ChannelInfos {
    channelInfos: ChannelInfo[];
    revision: number;

    constructor(args?: { channelInfos: ChannelInfo[]; revision: number; });
}

export class ChannelNotificationSetting {
    channelId: string;
    name: string;
    notificationReceivable: boolean;
    messageReceivable: boolean;
    showDefault: boolean;

    constructor(args?: { channelId: string; name: string; notificationReceivable: boolean; messageReceivable: boolean; showDefault: boolean; });
}

export class ChannelProvider {
    name: string;

    constructor(args?: { name: string; });
}

export class ChannelSettings {
    unapprovedMessageReceivable: boolean;

    constructor(args?: { unapprovedMessageReceivable: boolean; });
}

export class ChannelSyncDatas {
    channelInfos: ChannelInfo[];
    channelDomains: ChannelDomain[];
    revision: number;
    expires: number;

    constructor(args?: { channelInfos: ChannelInfo[]; channelDomains: ChannelDomain[]; revision: number; expires: number; });
}

export class ChannelToken {
    token: string;
    obsToken: string;
    expiration: number;
    refreshToken: string;
    channelAccessToken: string;

    constructor(args?: { token: string; obsToken: string; expiration: number; refreshToken: string; channelAccessToken: string; });
}

export class ClientLastStatus {
    lastRev: number;
    badgeCount: number;

    constructor(args?: { lastRev: number; badgeCount: number; });
}

export class Coin {
    freeCoinBalance: number;
    payedCoinBalance: number;
    totalCoinBalance: number;
    rewardCoinBalance: number;

    constructor(args?: { freeCoinBalance: number; payedCoinBalance: number; totalCoinBalance: number; rewardCoinBalance: number; });
}

export class CoinHistory {
    payDate: number;
    coinBalance: number;
    coin: number;
    price: string;
    title: string;
    refund: boolean;
    paySeq: string;
    currency: string;
    currencySign: string;
    displayPrice: string;
    payload: CoinPayLoad;
    channelId: string;

    constructor(args?: { payDate: number; coinBalance: number; coin: number; price: string; title: string; refund: boolean; paySeq: string; currency: string; currencySign: string; displayPrice: string; payload: CoinPayLoad; channelId: string; });
}

export class CoinHistoryCondition {
    start: number;
    size: number;
    language: string;
    eddt: string;
    appStoreCode: PaymentType;

    constructor(args?: { start: number; size: number; language: string; eddt: string; appStoreCode: PaymentType; });
}

export class CoinHistoryResult {
    historys: CoinHistory[];
    balance: Coin;
    hasNext: boolean;

    constructor(args?: { historys: CoinHistory[]; balance: Coin; hasNext: boolean; });
}

export class CoinPayLoad {
    payCoin: number;
    freeCoin: number;
    type: PayloadType;
    rewardCoin: number;

    constructor(args?: { payCoin: number; freeCoin: number; type: PayloadType; rewardCoin: number; });
}

export class CoinProductItem {
    itemId: string;
    coin: number;
    freeCoin: number;
    currency: string;
    price: string;
    displayPrice: string;
    name: string;
    desc: string;

    constructor(args?: { itemId: string; coin: number; freeCoin: number; currency: string; price: string; displayPrice: string; name: string; desc: string; });
}

export class CoinPurchaseConfirm {
    orderId: string;
    appStoreCode: PaymentType;
    receipt: string;
    signature: string;
    seller: string;
    requestType: string;
    ignoreReceipt: boolean;

    constructor(args?: { orderId: string; appStoreCode: PaymentType; receipt: string; signature: string; seller: string; requestType: string; ignoreReceipt: boolean; });
}

export class CoinPurchaseReservation {
    productId: string;
    country: string;
    currency: string;
    price: string;
    appStoreCode: PaymentType;
    language: string;
    pgCode: PaymentPgType;
    redirectUrl: string;

    constructor(args?: { productId: string; country: string; currency: string; price: string; appStoreCode: PaymentType; language: string; pgCode: PaymentPgType; redirectUrl: string; });
}

export class CoinUseReservation {
    channelId: string;
    shopOrderId: string;
    appStoreCode: PaymentType;
    items: CoinUseReservationItem[];
    country: string;

    constructor(args?: { channelId: string; shopOrderId: string; appStoreCode: PaymentType; items: CoinUseReservationItem[]; country: string; });
}

export class CoinUseReservationItem {
    itemId: string;
    itemName: string;
    amount: number;

    constructor(args?: { itemId: string; itemName: string; amount: number; });
}

export class CommitMessageResult {
    message: Message;
    code: CommitMessageResultCode;
    reason: string;
    successCount: number;
    failCount: number;
    unregisterCount: number;
    blockCount: number;

    constructor(args?: { message: Message; code: CommitMessageResultCode; reason: string; successCount: number; failCount: number; unregisterCount: number; blockCount: number; });
}

export class CommitSendMessagesToMidRequest {
    seq: number;
    messageIds: string[];

    constructor(args?: { seq: number; messageIds: string[]; });
}

export class CommitSendMessagesToMidResponse {
    successCount: number;
    failCount: number;
    unregisterCount: number;
    blockCount: number;

    constructor(args?: { successCount: number; failCount: number; unregisterCount: number; blockCount: number; });
}

export class CompactContact {
    mid: string;
    createdTime: number;
    modifiedTime: number;
    status: ContactStatus;
    settings: number;
    displayNameOverridden: string;

    constructor(args?: { mid: string; createdTime: number; modifiedTime: number; status: ContactStatus; settings: number; displayNameOverridden: string; });
}

export class Configurations {
    revision: number;
    configMap: { [k: string]: string; };

    constructor(args?: { revision: number; configMap: { [k: string]: string; }; });
}

export class Contact {
    mid: string;
    createdTime: number;
    type: ContactType;
    status: ContactStatus;
    relation: ContactRelation;
    displayName: string;
    phoneticName: string;
    pictureStatus: string;
    thumbnailUrl: string;
    statusMessage: string;
    displayNameOverridden: string;
    favoriteTime: number;
    capableVoiceCall: boolean;
    capableVideoCall: boolean;
    capableMyhome: boolean;
    capableBuddy: boolean;
    attributes: number;
    settings: number;
    picturePath: string;
    recommendParams: string;
    friendRequestStatus: FriendRequestStatus;
    musicProfile: string;
    videoProfile: string;

    constructor(args?: { mid: string; createdTime: number; type: ContactType; status: ContactStatus; relation: ContactRelation; displayName: string; phoneticName: string; pictureStatus: string; thumbnailUrl: string; statusMessage: string; displayNameOverridden: string; favoriteTime: number; capableVoiceCall: boolean; capableVideoCall: boolean; capableMyhome: boolean; capableBuddy: boolean; attributes: number; settings: number; picturePath: string; recommendParams: string; friendRequestStatus: FriendRequestStatus; musicProfile: string; videoProfile: string; });
}

export class ContactModification {
    type: ModificationType;
    luid: string;
    phones: string[];
    emails: string[];
    userids: string[];

    constructor(args?: { type: ModificationType; luid: string; phones: string[]; emails: string[]; userids: string[]; });
}

export class ContactRegistration {
    contact: Contact;
    luid: string;
    contactType: ContactType;
    contactKey: string;

    constructor(args?: { contact: Contact; luid: string; contactType: ContactType; contactKey: string; });
}

export class ContactReport {
    mid: string;
    exists: boolean;
    contact: Contact;

    constructor(args?: { mid: string; exists: boolean; contact: Contact; });
}

export class ContactReportResult {
    mid: string;
    exists: boolean;

    constructor(args?: { mid: string; exists: boolean; });
}

export class ContactTransition {
    ownerMid: string;
    targetMid: string;
    previousStatus: ContactStatus;
    resultStatus: ContactStatus;

    constructor(args?: { ownerMid: string; targetMid: string; previousStatus: ContactStatus; resultStatus: ContactStatus; });
}

export class DeviceInfo {
    deviceName: string;
    systemName: string;
    systemVersion: string;
    model: string;
    webViewVersion: string;
    carrierCode: CarrierCode;
    carrierName: string;
    applicationType: ApplicationType;

    constructor(args?: { deviceName: string; systemName: string; systemVersion: string; model: string; webViewVersion: string; carrierCode: CarrierCode; carrierName: string; applicationType: ApplicationType; });
}

export class E2EEGroupSharedKey {
    version: number;
    groupKeyId: number;
    creator: string;
    creatorKeyId: number;
    receiver: string;
    receiverKeyId: number;
    encryptedSharedKey: string;
    allowedTypes: ContentType[];

    constructor(args?: { version: number; groupKeyId: number; creator: string; creatorKeyId: number; receiver: string; receiverKeyId: number; encryptedSharedKey: string; allowedTypes: ContentType[]; });
}

export class E2EEKey {
    version: number;
    keyId: number;
    publicKey: string;
    privateKey: string;
    createdTime: number;

    constructor(args?: { version: number; keyId: number; publicKey: string; privateKey: string; createdTime: number; });
}

export class E2EEKeyChain {
    keychain: E2EEKey[];

    constructor(args?: { keychain: E2EEKey[]; });
    read(input: Thrift.TProtocol): void;
}

export class E2EENegotiationResult {
    allowedTypes: ContentType[];
    publicKey: E2EEPublicKey;

    constructor(args?: { allowedTypes: ContentType[]; publicKey: E2EEPublicKey; });
}

export class E2EEPublicKey {
    version: number;
    keyId: number;
    keyData: Buffer;
    createdTime: number;

    constructor(args?: { version: number; keyId: number; keyData: string; createdTime: number; });
}

export class EmailConfirmation {
    usePasswordSet: boolean;
    email: string;
    password: string;
    ignoreDuplication: boolean;
    useEmailOnly: boolean;

    constructor(args?: { usePasswordSet: boolean; email: string; password: string; ignoreDuplication: boolean; useEmailOnly: boolean; });
}

export class EmailConfirmationResult {
    certificate: string;

    constructor(args?: { certificate: string; });
}

export class EmailConfirmationSession {
    emailConfirmationType: EmailConfirmationType;
    verifier: string;
    targetEmail: string;

    constructor(args?: { emailConfirmationType: EmailConfirmationType; verifier: string; targetEmail: string; });
}

export class ExtendedProfile {
    birthday: ExtendedProfileBirthday;

    constructor(args?: { birthday: ExtendedProfileBirthday; });
}

export class ExtendedProfileBirthday {
    year: string;
    yearPrivacyLevelType: PrivacyLevelType;
    yearEnabled: boolean;
    day: string;
    dayPrivacyLevelType: PrivacyLevelType;
    dayEnabled: boolean;

    constructor(args?: { year: string; yearPrivacyLevelType: PrivacyLevelType; yearEnabled: boolean; day: string; dayPrivacyLevelType: PrivacyLevelType; dayEnabled: boolean; });
}

export class FriendChannelMatricesResponse {
    expires: number;
    matrices: FriendChannelMatrix[];

    constructor(args?: { expires: number; matrices: FriendChannelMatrix[]; });
}

export class FriendChannelMatrix {
    channelId: string;
    representMid: string;
    count: number;
    point: number;

    constructor(args?: { channelId: string; representMid: string; count: number; point: number; });
}

export class FriendRequest {
    eMid: string;
    mid: string;
    direction: FriendRequestDirection;
    method: FriendRequestMethod;
    param: string;
    timestamp: number;
    seqId: number;
    displayName: string;
    picturePath: string;
    pictureStatus: string;

    constructor(args?: { eMid: string; mid: string; direction: FriendRequestDirection; method: FriendRequestMethod; param: string; timestamp: number; seqId: number; displayName: string; picturePath: string; pictureStatus: string; });
}

export class FriendRequestsInfo {
    totalIncomingCount: number;
    totalOutgoingCount: number;
    recentIncomings: FriendRequest[];
    recentOutgoings: FriendRequest[];
    totalIncomingLimit: number;
    totalOutgoingLimit: number;

    constructor(args?: { totalIncomingCount: number; totalOutgoingCount: number; recentIncomings: FriendRequest[]; recentOutgoings: FriendRequest[]; totalIncomingLimit: number; totalOutgoingLimit: number; });
}

export class Geolocation {
    longitude: number;
    latitude: number;

    constructor(args?: { longitude: number; latitude: number; });
}

export class GetBalanceRequest {
}

export class GetBalanceResponse {
    balance: Balance;

    constructor(args?: { balance: Balance; });
}

export class GetCoinHistoryRequest {
    appStoreCode: PaymentType;
    country: string;
    language: string;
    searchEndDate: string;
    offset: number;
    limit: number;

    constructor(args?: { appStoreCode: PaymentType; country: string; language: string; searchEndDate: string; offset: number; limit: number; });
}

export class GetCoinHistoryResponse {
    histories: CoinHistory[];
    balance: Coin;
    offset: number;
    hasNext: boolean;

    constructor(args?: { histories: CoinHistory[]; balance: Coin; offset: number; hasNext: boolean; });
}

export class GetCoinProductsRequest {
    appStoreCode: PaymentType;
    country: string;
    language: string;
    pgCode: PaymentPgType;

    constructor(args?: { appStoreCode: PaymentType; country: string; language: string; pgCode: PaymentPgType; });
}

export class GetCoinProductsResponse {
    items: CoinProductItem[];

    constructor(args?: { items: CoinProductItem[]; });
}

export class GetTotalCoinBalanceRequest {
    appStoreCode: PaymentType;

    constructor(args?: { appStoreCode: PaymentType; });
}

export class GetTotalCoinBalanceResponse {
    totalBalance: string;
    paidCoinBalance: string;
    freeCoinBalance: string;
    rewardCoinBalance: string;
    expectedAutoExchangedCoinBalance: string;

    constructor(args?: { totalBalance: string; paidCoinBalance: string; freeCoinBalance: string; rewardCoinBalance: string; expectedAutoExchangedCoinBalance: string; });
}

export class Group {
    id: string;
    createdTime: number;
    name: string;
    pictureStatus: string;
    preventedJoinByTicket: boolean;
    groupPreference: GroupPreference;
    members: Contact[];
    creator: Contact;
    invitee: Contact[];
    notificationDisabled: boolean;
    picturePath: string;
    memberMids: string[];
    inviteeMids: string[];

    constructor(args?: { id: string; createdTime: number; name: string; pictureStatus: string; preventedJoinByTicket: boolean; groupPreference: GroupPreference; members: Contact[]; creator: Contact; invitee: Contact[]; notificationDisabled: boolean; picturePath: string; memberMids: string[]; inviteeMids: string[]; });
}

export class GroupCall {
    online: boolean;
    chatMid: string;
    hostMid: string;
    memberMids: string[];
    started: number;
    mediaType: GroupCallMediaType;

    constructor(args?: { online: boolean; chatMid: string; hostMid: string; memberMids: string[]; started: number; mediaType: GroupCallMediaType; });
}

export class GroupCallRoute {
    token: string;
    cscf: CallHost;
    mix: CallHost;

    constructor(args?: { token: string; cscf: CallHost; mix: CallHost; });
}

export class GroupPreference {
    invitationTicket: string;
    favoriteTimestamp: number;

    constructor(args?: { invitationTicket: string; favoriteTimestamp: number; });
}

export class IdentityCredential {
    provider: IdentityProvider;
    identifier: string;
    password: string;

    constructor(args?: { provider: IdentityProvider; identifier: string; password: string; });
}

export class Location {
    title: string;
    address: string;
    latitude: number;
    longitude: number;
    phone: string;

    constructor(args?: { title: string; address: string; latitude: number; longitude: number; phone: string; });
}

export class LoginRequest {
    type: LoginType;
    identityProvider: IdentityProvider;
    identifier: string;
    password: string;
    keepLoggedIn: boolean;
    accessLocation: string;
    systemName: string;
    certificate: string;
    verifier: string;
    secret: string;
    e2eeVersion: number;

    constructor(args?: { type: LoginType; identityProvider: IdentityProvider; identifier: string; password: string; keepLoggedIn: boolean; accessLocation: string; systemName: string; certificate: string; verifier: string; secret: string; e2eeVersion: number; });
}

export class LoginResult {
    authToken: string;
    certificate: string;
    verifier: string;
    pinCode: string;
    type: LoginResultType;
    lastPrimaryBindTime: number;
    displayMessage: string;
    sessionForSMSConfirm: VerificationSessionData;

    constructor(args?: { authToken: string; certificate: string; verifier: string; pinCode: string; type: LoginResultType; lastPrimaryBindTime: number; displayMessage: string; sessionForSMSConfirm: VerificationSessionData; });
}

export class LoginSession {
    tokenKey: string;
    expirationTime: number;
    applicationType: ApplicationType;
    systemName: string;
    accessLocation: string;

    constructor(args?: { tokenKey: string; expirationTime: number; applicationType: ApplicationType; systemName: string; accessLocation: string; });
}

export class Message {
    from_: string;
    to: string;
    toType: MIDType;
    id: string;
    createdTime: number;
    deliveredTime: number;
    text?: string;
    location?: Location;
    hasContent: boolean;
    contentType: ContentType;
    contentPreview: string;
    contentMetadata: { [k: string]: string; };
    sessionId: any;
    chunks: Buffer[];
    relatedMessageId: string;
    messageRelationType: MessageRelationType;
    readCount: number;
    relatedMessageServiceCode: ServiceCode;

    constructor(args?: { from_: string; to: string; toType: MIDType; id: string; createdTime: number; deliveredTime: number; text: string; location: Location; hasContent: boolean; contentType: ContentType; contentPreview: string; contentMetadata: { [k: string]: string; }; sessionId: any; chunks: string[]; relatedMessageId: string; messageRelationType: MessageRelationType; readCount: number; relatedMessageServiceCode: ServiceCode; });
}

export class MessageBoxV2MessageId {
    deliveredTime: number;
    messageId: number;

    constructor(args?: { deliveredTime: number; messageId: number; });
}

export class MessageCommitResult {
    requestId: string;
    state: BuddyResultState;
    messageStoreRequestId: string;
    messageIds: string[];
    receiverCount: number;
    successCount: number;
    failCount: number;
    blockCount: number;
    unregisteredCount: number;
    unrelatedCount: number;
    errorDescription: string;

    constructor(args?: { requestId: string; state: BuddyResultState; messageStoreRequestId: string; messageIds: string[]; receiverCount: number; successCount: number; failCount: number; blockCount: number; unregisteredCount: number; unrelatedCount: number; errorDescription: string; });
}

export class MessageStoreResult {
    requestId: string;
    messageIds: string[];

    constructor(args?: { requestId: string; messageIds: string[]; });
}

export class MetaProfile {
    createTime: number;
    regionCode: string;
    identities: any;
    udid: string;

    constructor(args?: { createTime: number; regionCode: string; identities: any; udid: string; });
}

export class MoretabRecommend {
    accounts: MoretabRecommendAccount[];
    nextUpdateTime: number;
    cacheTtlMillis: number;

    constructor(args?: { accounts: MoretabRecommendAccount[]; nextUpdateTime: number; cacheTtlMillis: number; });
}

export class MoretabRecommendAccount {
    mid: string;
    displayName: string;
    statusMessage: string;
    pictureStatus: string;
    picturePath: string;

    constructor(args?: { mid: string; displayName: string; statusMessage: string; pictureStatus: string; picturePath: string; });
}

export class NearbyEntry {
    emid: string;
    distance: number;
    lastUpdatedInSec: number;
    property: { [k: string]: string; };
    profile: Profile;

    constructor(args?: { emid: string; distance: number; lastUpdatedInSec: number; property: { [k: string]: string; }; profile: Profile; });
}

export class NotiCenterEventData {
    id: string;
    to: string;
    from_: string;
    toChannel: string;
    fromChannel: string;
    eventType: string;
    createdTime: number;
    operationRevision: number;
    content: { [k: string]: string; };
    push: { [k: string]: string; };

    constructor(args?: { id: string; to: string; from_: string; toChannel: string; fromChannel: string; eventType: string; createdTime: number; operationRevision: number; content: { [k: string]: string; }; push: { [k: string]: string; }; });
}

export class NotificationFetchResult {
    fetchMode: NotificationItemFetchMode;
    itemList: NotificationItem[];

    constructor(args?: { fetchMode: NotificationItemFetchMode; itemList: NotificationItem[]; });
}

export class NotificationItem {
    id: string;
    from_: string;
    to: string;
    fromChannel: string;
    toChannel: string;
    revision: number;
    createdTime: number;
    content: { [k: string]: string; };

    constructor(args?: { id: string; from_: string; to: string; fromChannel: string; toChannel: string; revision: number; createdTime: number; content: { [k: string]: string; }; });
}

export class Operation {
    revision: number;
    createdTime: number;
    type: OpType;
    reqSeq: number;
    checksum: string;
    status: OpStatus;
    param1: string;
    param2: string;
    param3: string;
    message: Message;

    constructor(args?: { revision: number; createdTime: number; type: OpType; reqSeq: number; checksum: string; status: OpStatus; param1: string; param2: string; param3: string; message: Message; });
}

export class OTPResult {
    otpId: string;
    otp: string;

    constructor(args?: { otpId: string; otp: string; });
}

export class PaidCallAdCountry {
    countryCode: string;
    rateDivision: string;

    constructor(args?: { countryCode: string; rateDivision: string; });
}

export class PaidCallAdResult {
    adRemains: number;

    constructor(args?: { adRemains: number; });
}

export class PaidCallBalance {
    productType: PaidCallProductType;
    productName: string;
    unit: string;
    limitedPaidBalance: number;
    limitedFreeBalance: number;
    unlimitedPaidBalance: number;
    unlimitedFreeBalance: number;
    startTime: number;
    endTime: number;
    autopayEnabled: boolean;

    constructor(args?: { productType: PaidCallProductType; productName: string; unit: string; limitedPaidBalance: number; limitedFreeBalance: number; unlimitedPaidBalance: number; unlimitedFreeBalance: number; startTime: number; endTime: number; autopayEnabled: boolean; });
}

export class PaidCallCurrencyExchangeRate {
    currencyCode: string;
    currencyName: string;
    currencySign: string;
    preferred: boolean;
    coinRate: string;
    creditRate: string;

    constructor(args?: { currencyCode: string; currencyName: string; currencySign: string; preferred: boolean; coinRate: string; creditRate: string; });
}

export class PaidCallDialing {
    type: PaidCallType;
    dialedNumber: string;
    serviceDomain: string;
    productType: PaidCallProductType;
    productName: string;
    multipleProduct: boolean;
    callerIdStatus: PaidCallerIdStatus;
    balance: number;
    unit: string;
    rate: number;
    displayCode: string;
    calledNumber: string;
    calleeNationalNumber: string;
    calleeCallingCode: string;
    rateDivision: string;
    adMaxMin: number;
    adRemains: number;
    adSessionId: string;

    constructor(args?: { type: PaidCallType; dialedNumber: string; serviceDomain: string; productType: PaidCallProductType; productName: string; multipleProduct: boolean; callerIdStatus: PaidCallerIdStatus; balance: number; unit: string; rate: number; displayCode: string; calledNumber: string; calleeNationalNumber: string; calleeCallingCode: string; rateDivision: string; adMaxMin: number; adRemains: number; adSessionId: string; });
}

export class PaidCallHistory {
    seq: number;
    type: PaidCallType;
    dialedNumber: string;
    calledNumber: string;
    toMid: string;
    toName: string;
    setupTime: number;
    startTime: number;
    endTime: number;
    duration: number;
    terminate: number;
    productType: PaidCallProductType;
    charge: number;
    unit: string;
    result: string;

    constructor(args?: { seq: number; type: PaidCallType; dialedNumber: string; calledNumber: string; toMid: string; toName: string; setupTime: number; startTime: number; endTime: number; duration: number; terminate: number; productType: PaidCallProductType; charge: number; unit: string; result: string; });
}

export class PaidCallHistoryResult {
    historys: PaidCallHistory[];
    hasNext: boolean;

    constructor(args?: { historys: PaidCallHistory[]; hasNext: boolean; });
}

export class PaidCallMetadataResult {
    currencyExchangeRates: PaidCallCurrencyExchangeRate[];
    recommendedCountryCodes: string[];
    adCountries: PaidCallAdCountry[];

    constructor(args?: { currencyExchangeRates: PaidCallCurrencyExchangeRate[]; recommendedCountryCodes: string[]; adCountries: PaidCallAdCountry[]; });
}

export class PaidCallRedeemResult {
    eventName: string;
    eventAmount: number;

    constructor(args?: { eventName: string; eventAmount: number; });
}

export class PaidCallResponse {
    host: CallHost;
    dialing: PaidCallDialing;
    token: string;
    spotItems: SpotItem[];

    constructor(args?: { host: CallHost; dialing: PaidCallDialing; token: string; spotItems: SpotItem[]; });
}

export class PaidCallUserRate {
    countryCode: string;
    rate: number;
    rateDivision: string;
    rateName: string;

    constructor(args?: { countryCode: string; rate: number; rateDivision: string; rateName: string; });
}

export class PaymentReservation {
    receiverMid: string;
    productId: string;
    language: string;
    location: string;
    currency: string;
    price: string;
    appStoreCode: PaymentType;
    messageText: string;
    messageTemplate: number;
    packageId: number;

    constructor(args?: { receiverMid: string; productId: string; language: string; location: string; currency: string; price: string; appStoreCode: PaymentType; messageText: string; messageTemplate: number; packageId: number; });
}

export class PaymentReservationResult {
    orderId: string;
    confirmUrl: string;
    extras: { [k: string]: string; };

    constructor(args?: { orderId: string; confirmUrl: string; extras: { [k: string]: string; }; });
}

export class PhoneInfoForChannel {
    mid: string;
    normalizedPhoneNumber: string;
    allowedToSearchByPhoneNumber: boolean;
    allowedToReceiveMessageFromNonFriend: boolean;
    region: string;

    constructor(args?: { mid: string; normalizedPhoneNumber: string; allowedToSearchByPhoneNumber: boolean; allowedToReceiveMessageFromNonFriend: boolean; region: string; });
}

export class PhoneVerificationResult {
    verificationResult: VerificationResult;
    accountMigrationCheckType: AccountMigrationCheckType;
    recommendAddFriends: boolean;

    constructor(args?: { verificationResult: VerificationResult; accountMigrationCheckType: AccountMigrationCheckType; recommendAddFriends: boolean; });
}

export class PlaceSearchInfo {
    name: string;
    address: string;
    latitude: number;
    longitude: number;

    constructor(args?: { name: string; address: string; latitude: number; longitude: number; });
}

export class PointException extends Thrift.TException {
    code: PointErrorCode;
    reason: string;
    extra: { [k: string]: string; };

    constructor(args?: { code: PointErrorCode; reason: string; extra: { [k: string]: string; }; });
}

export class PrivateBotMessage {
    message: Message;
    linkFrom: string;

    constructor(args?: { message: Message; linkFrom: string; });
}

export class Product {
    productId: string;
    packageId: number;
    version: number;
    authorName: string;
    onSale: boolean;
    validDays: number;
    saleType: number;
    copyright: string;
    title: string;
    descriptionText: string;
    shopOrderId: number;
    fromMid: string;
    toMid: string;
    validUntil: number;
    priceTier: number;
    price: string;
    currency: string;
    currencySymbol: string;
    paymentType: PaymentType;
    createDate: number;
    ownFlag: boolean;
    eventType: ProductEventType;
    urlSchema: string;
    downloadUrl: string;
    buddyMid: string;
    publishSince: number;
    newFlag: boolean;
    missionFlag: boolean;
    categories: ProductCategory[];
    missionButtonText: string;
    missionShortDescription: string;
    authorId: string;
    grantedByDefault: boolean;
    displayOrder: number;
    availableForPresent: boolean;
    availableForMyself: boolean;
    hasAnimation: boolean;
    hasSound: boolean;
    recommendationsEnabled: boolean;
    stickerResourceType: StickerResourceType;

    constructor(args?: { productId: string; packageId: number; version: number; authorName: string; onSale: boolean; validDays: number; saleType: number; copyright: string; title: string; descriptionText: string; shopOrderId: number; fromMid: string; toMid: string; validUntil: number; priceTier: number; price: string; currency: string; currencySymbol: string; paymentType: PaymentType; createDate: number; ownFlag: boolean; eventType: ProductEventType; urlSchema: string; downloadUrl: string; buddyMid: string; publishSince: number; newFlag: boolean; missionFlag: boolean; categories: ProductCategory[]; missionButtonText: string; missionShortDescription: string; authorId: string; grantedByDefault: boolean; displayOrder: number; availableForPresent: boolean; availableForMyself: boolean; hasAnimation: boolean; hasSound: boolean; recommendationsEnabled: boolean; stickerResourceType: StickerResourceType; });
}

export class ProductCategory {
    productCategoryId: number;
    title: string;
    productCount: number;
    newFlag: boolean;

    constructor(args?: { productCategoryId: number; title: string; productCount: number; newFlag: boolean; });
}

export class ProductList {
    hasNext: boolean;
    bannerSequence: number;
    bannerTargetType: ProductBannerLinkType;
    bannerTargetPath: string;
    productList: Product[];
    bannerLang: string;

    constructor(args?: { hasNext: boolean; bannerSequence: number; bannerTargetType: ProductBannerLinkType; bannerTargetPath: string; productList: Product[]; bannerLang: string; });
}

export class ProductSimple {
    productId: string;
    packageId: number;
    version: number;
    onSale: boolean;
    validUntil: number;
    stickerIdRanges: StickerIdRange[];
    grantedByDefault: boolean;
    displayOrder: number;

    constructor(args?: { productId: string; packageId: number; version: number; onSale: boolean; validUntil: number; stickerIdRanges: StickerIdRange[]; grantedByDefault: boolean; displayOrder: number; });
}

export class ProductSimpleList {
    hasNext: boolean;
    reinvokeHour: number;
    lastVersionSeq: number;
    productList: ProductSimple[];
    recentNewReleaseDate: number;
    recentEventReleaseDate: number;

    constructor(args?: { hasNext: boolean; reinvokeHour: number; lastVersionSeq: number; productList: ProductSimple[]; recentNewReleaseDate: number; recentEventReleaseDate: number; });
}

export class Profile {
    mid: string;
    userid: string;
    phone: string;
    email: string;
    regionCode: string;
    displayName: string;
    phoneticName: string;
    pictureStatus: string;
    thumbnailUrl: string;
    statusMessage: string;
    allowSearchByUserid: boolean;
    allowSearchByEmail: boolean;
    picturePath: string;
    musicProfile: string;
    videoProfile: string;

    constructor(args?: { mid: string; userid: string; phone: string; email: string; regionCode: string; displayName: string; phoneticName: string; pictureStatus: string; thumbnailUrl: string; statusMessage: string; allowSearchByUserid: boolean; allowSearchByEmail: boolean; picturePath: string; musicProfile: string; videoProfile: string; });
}

export class ProximityMatchCandidateEntry {
    contact: Contact;
    buddyDetail: BuddyDetail;

    constructor(args?: { contact: Contact; buddyDetail: BuddyDetail; });
}

export class ProximityMatchCandidateResult {
    users: ProximityMatchCandidateEntry[];
    buddies: ProximityMatchCandidateEntry[];
    endOfResult: boolean;

    constructor(args?: { users: ProximityMatchCandidateEntry[]; buddies: ProximityMatchCandidateEntry[]; endOfResult: boolean; });
}

export class PublicKey {
    keyAlgorithm: AsymmetricKeyAlgorithm;
    keySize: number;
    keyData: string;
    createdTime: number;

    constructor(args?: { keyAlgorithm: AsymmetricKeyAlgorithm; keySize: number; keyData: string; createdTime: number; });
}

export class PublicKeychain {
    publicKeys: PublicKey[];

    constructor(args?: { publicKeys: PublicKey[]; });
}

export class QueueingPolicy {
    priority: number;
    policy: string;

    constructor(args?: { priority: number; policy: string; });
}

export class RegisterWithPhoneNumberResult {
    authToken: string;
    recommendEmailRegistration: boolean;
    certificate: string;

    constructor(args?: { authToken: string; recommendEmailRegistration: boolean; certificate: string; });
}

export class RegisterWithSnsIdResult {
    authToken: string;
    userCreated: boolean;
    recommendEmailRegistration: boolean;

    constructor(args?: { authToken: string; userCreated: boolean; recommendEmailRegistration: boolean; });
}

export class RequestTokenResponse {
    requestToken: string;
    returnUrl: string;

    constructor(args?: { requestToken: string; returnUrl: string; });
}

export class RingbackTone {
    uuid: string;
    trackId: string;
    title: string;
    oid: string;
    tids: { [k: string]: string; };

    constructor(args?: { uuid: string; trackId: string; title: string; oid: string; tids: { [k: string]: string; }; });
}

export class Room {
    mid: string;
    createdTime: number;
    contacts: Contact[];
    notificationDisabled: boolean;
    memberMids: string[];

    constructor(args?: { mid: string; createdTime: number; contacts: Contact[]; notificationDisabled: boolean; memberMids: string[]; });
}

export class RSAKey {
    keynm: string;
    nvalue: string;
    evalue: string;
    sessionKey: string;

    constructor(args?: { keynm: string; nvalue: string; evalue: string; sessionKey: string; });
}

export class SecurityCenterResult {
    uri: string;
    token: string;
    cookiePath: string;
    skip: boolean;

    constructor(args?: { uri: string; token: string; cookiePath: string; skip: boolean; });
}

export class SendBuddyMessageResult {
    requestId: string;
    state: BuddyResultState;
    messageId: string;
    eventNo: number;
    receiverCount: number;
    successCount: number;
    failCount: number;
    cancelCount: number;
    blockCount: number;
    unregisterCount: number;
    unrelatedCount: number;
    timestamp: number;
    message: string;

    constructor(args?: { requestId: string; state: BuddyResultState; messageId: string; eventNo: number; receiverCount: number; successCount: number; failCount: number; cancelCount: number; blockCount: number; unregisterCount: number; unrelatedCount: number; timestamp: number; message: string; });
}

export class SendPostbackRequest {
    messageId: string;
    url: string;
    chatMID: string;
    originMID: string;

    constructor(args?: { messageId: string; url: string; chatMID: string; originMID: string; });
}

export class SetBuddyOnAirResult {
    requestId: string;
    state: BuddyResultState;
    eventNo: number;
    receiverCount: number;
    successCount: number;
    failCount: number;
    cancelCount: number;
    unregisterCount: number;
    timestamp: number;
    message: string;

    constructor(args?: { requestId: string; state: BuddyResultState; eventNo: number; receiverCount: number; successCount: number; failCount: number; cancelCount: number; unregisterCount: number; timestamp: number; message: string; });
}

export class Settings {
    notificationEnable: boolean;
    notificationMuteExpiration: number;
    notificationNewMessage: boolean;
    notificationGroupInvitation: boolean;
    notificationShowMessage: boolean;
    notificationIncomingCall: boolean;
    notificationSoundMessage: string;
    notificationSoundGroup: string;
    notificationDisabledWithSub: boolean;
    notificationPayment: boolean;
    privacySyncContacts: boolean;
    privacySearchByPhoneNumber: boolean;
    privacySearchByUserid: boolean;
    privacySearchByEmail: boolean;
    privacyAllowSecondaryDeviceLogin: boolean;
    privacyProfileImagePostToMyhome: boolean;
    privacyReceiveMessagesFromNotFriend: boolean;
    privacyAgreeUseLineCoinToPaidCall: boolean;
    privacyAgreeUsePaidCall: boolean;
    privacyAllowFriendRequest: boolean;
    contactMyTicket: string;
    identityProvider: IdentityProvider;
    identityIdentifier: string;
    snsAccounts: any;
    phoneRegistration: boolean;
    emailConfirmationStatus: EmailConfirmationStatus;
    accountMigrationPincodeType: AccountMigrationPincodeType;
    enforcedInputAccountMigrationPincode: boolean;
    securityCenterSettingsType: SecurityCenterSettingsType;
    allowUnregistrationSecondaryDevice: boolean;
    preferenceLocale: string;
    customModes: { [k: number /*CustomMode*/]: string; };
    e2eeEnable: boolean;
    hitokotoBackupRequested: boolean;
    privacyProfileMusicPostToMyhome: boolean;
    privacyAllowNearby: boolean;
    agreementNearbyTime: number;
    agreementSquareTime: number;
    notificationMention: boolean;
    botUseAgreementAcceptedAt: number;

    constructor(args?: { notificationEnable: boolean; notificationMuteExpiration: number; notificationNewMessage: boolean; notificationGroupInvitation: boolean; notificationShowMessage: boolean; notificationIncomingCall: boolean; notificationSoundMessage: string; notificationSoundGroup: string; notificationDisabledWithSub: boolean; notificationPayment: boolean; privacySyncContacts: boolean; privacySearchByPhoneNumber: boolean; privacySearchByUserid: boolean; privacySearchByEmail: boolean; privacyAllowSecondaryDeviceLogin: boolean; privacyProfileImagePostToMyhome: boolean; privacyReceiveMessagesFromNotFriend: boolean; privacyAgreeUseLineCoinToPaidCall: boolean; privacyAgreeUsePaidCall: boolean; privacyAllowFriendRequest: boolean; contactMyTicket: string; identityProvider: IdentityProvider; identityIdentifier: string; snsAccounts: any; phoneRegistration: boolean; emailConfirmationStatus: EmailConfirmationStatus; accountMigrationPincodeType: AccountMigrationPincodeType; enforcedInputAccountMigrationPincode: boolean; securityCenterSettingsType: SecurityCenterSettingsType; allowUnregistrationSecondaryDevice: boolean; preferenceLocale: string; customModes: { [k: number /*CustomMode*/]: string; }; e2eeEnable: boolean; hitokotoBackupRequested: boolean; privacyProfileMusicPostToMyhome: boolean; privacyAllowNearby: boolean; agreementNearbyTime: number; agreementSquareTime: number; notificationMention: boolean; botUseAgreementAcceptedAt: number; });
}

export class ShopUpdates {
    latestNewReleaseTime: number;
    latestEventReleaseTime: number;
    latestCategoryUpdateTime: number;
    lastVersion: number;
    updatedProductList: ProductSimple[];

    constructor(args?: { latestNewReleaseTime: number; latestEventReleaseTime: number; latestCategoryUpdateTime: number; lastVersion: number; updatedProductList: ProductSimple[]; });
}

export class ShouldSyncException extends Thrift.TException {
    syncOpRevision: number;
    syncScope: SyncScope;
    syncReason: SyncTriggerReason;
    message: string;

    constructor(args?: { syncOpRevision: number; syncScope: SyncScope; syncReason: SyncTriggerReason; message: string; });
}

export class SIMInfo {
    phoneNumber: string;
    countryCode: string;

    constructor(args?: { phoneNumber: string; countryCode: string; });
}

export class SimpleChannelClient {
    applicationType: string;
    applicationVersion: string;
    locale: string;
    mid: string;

    constructor(args?: { applicationType: string; applicationVersion: string; locale: string; mid: string; });
}

export class SimpleChannelContact {
    mid: string;
    displayName: string;
    pictureStatus: string;
    picturePath: string;
    statusMessage: string;
    userid: string;
    regionCode: string;

    constructor(args?: { mid: string; displayName: string; pictureStatus: string; picturePath: string; statusMessage: string; userid: string; regionCode: string; });
}

export class SnsFriend {
    snsUserId: string;
    snsUserName: string;
    snsIdType: SnsIdType;

    constructor(args?: { snsUserId: string; snsUserName: string; snsIdType: SnsIdType; });
}

export class SnsFriendContactRegistration {
    contact: Contact;
    snsIdType: SnsIdType;
    snsUserId: string;

    constructor(args?: { contact: Contact; snsIdType: SnsIdType; snsUserId: string; });
}

export class SnsFriendModification {
    type: ModificationType;
    snsFriend: SnsFriend;

    constructor(args?: { type: ModificationType; snsFriend: SnsFriend; });
}

export class SnsFriends {
    snsFriends: SnsFriend[];
    hasMore: boolean;

    constructor(args?: { snsFriends: SnsFriend[]; hasMore: boolean; });
}

export class SnsIdUserStatus {
    userExisting: boolean;
    phoneNumberRegistered: boolean;
    sameDevice: boolean;
    accountMigrationCheckType: AccountMigrationCheckType;

    constructor(args?: { userExisting: boolean; phoneNumberRegistered: boolean; sameDevice: boolean; accountMigrationCheckType: AccountMigrationCheckType; });
}

export class SnsProfile {
    snsUserId: string;
    snsUserName: string;
    email: string;
    thumbnailUrl: string;

    constructor(args?: { snsUserId: string; snsUserName: string; email: string; thumbnailUrl: string; });
}

export class SpotItem {
    name: string;
    phone: string;
    category: SpotCategory;
    mid: string;
    countryAreaCode: string;
    freePhoneCallable: boolean;

    constructor(args?: { name: string; phone: string; category: SpotCategory; mid: string; countryAreaCode: string; freePhoneCallable: boolean; });
}

export class SpotNearbyItem {
    spotItem: SpotItem;
    location: Location;

    constructor(args?: { spotItem: SpotItem; location: Location; });
}

export class SpotNearbyResponse {
    spotNearbyItems: SpotNearbyItem[];

    constructor(args?: { spotNearbyItems: SpotNearbyItem[]; });
}

export class SpotPhoneNumberResponse {
    spotItems: SpotItem[];

    constructor(args?: { spotItems: SpotItem[]; });
}

export class StickerIdRange {
    start: number;
    size: number;

    constructor(args?: { start: number; size: number; });
}

export class SuggestDictionary {
    language: string;
    name: string;

    constructor(args?: { language: string; name: string; });
}

export class SuggestDictionaryIncrements {
    itemIncrement: SuggestItemDictionaryIncrement;
    tagIncrements: SuggestTagDictionaryIncrement[];

    constructor(args?: { itemIncrement: SuggestItemDictionaryIncrement; tagIncrements: SuggestTagDictionaryIncrement[]; });
}

export class SuggestDictionaryRevisions {
    itemRevision: SuggestItemDictionaryRevision;
    tagRevisions: SuggestTagDictionaryRevision[];

    constructor(args?: { itemRevision: SuggestItemDictionaryRevision; tagRevisions: SuggestTagDictionaryRevision[]; });
}

export class SuggestDictionarySettings {
    revision: number;
    newRevision: number;
    dictionaries: SuggestDictionary[];
    preloadedDictionaries: string[];

    constructor(args?: { revision: number; newRevision: number; dictionaries: SuggestDictionary[]; preloadedDictionaries: string[]; });
}

export class SuggestItemDictionaryIncrement {
    status: SuggestDictionaryIncrementStatus;
    revision: number;
    scheme: string;
    data: string;

    constructor(args?: { status: SuggestDictionaryIncrementStatus; revision: number; scheme: string; data: string; });
}

export class SuggestItemDictionaryRevision {
    revision: number;
    scheme: string;

    constructor(args?: { revision: number; scheme: string; });
}

export class SuggestTagDictionaryIncrement {
    status: SuggestDictionaryIncrementStatus;
    language: string;
    revision: number;
    scheme: string;
    data: string;

    constructor(args?: { status: SuggestDictionaryIncrementStatus; language: string; revision: number; scheme: string; data: string; });
}

export class SuggestTagDictionaryRevision {
    language: string;
    revision: number;
    scheme: string;

    constructor(args?: { language: string; revision: number; scheme: string; });
}

export class SyncParamContact {
    syncParamMid: SyncParamMid;
    contactStatus: ContactStatus;

    constructor(args?: { syncParamMid: SyncParamMid; contactStatus: ContactStatus; });
}

export class SyncParamMid {
    mid: string;
    diff: Diff;
    revision: number;

    constructor(args?: { mid: string; diff: Diff; revision: number; });
}

export class SyncRelations {
    syncAll: boolean;
    syncParamContact: SyncParamContact[];
    syncParamMid: SyncParamMid[];

    constructor(args?: { syncAll: boolean; syncParamContact: SyncParamContact[]; syncParamMid: SyncParamMid[]; });
}

export class SyncScope {
    syncProfile: boolean;
    syncSettings: boolean;
    syncSticker: boolean;
    syncThemeShop: boolean;
    contact: SyncRelations;
    group: SyncRelations;
    room: SyncRelations;
    chat: SyncRelations;

    constructor(args?: { syncProfile: boolean; syncSettings: boolean; syncSticker: boolean; syncThemeShop: boolean; contact: SyncRelations; group: SyncRelations; room: SyncRelations; chat: SyncRelations; });
}

export class SystemConfiguration {
    endpoint: string;
    endpointSsl: string;
    updateUrl: string;
    c2dmAccount: string;
    nniServer: string;

    constructor(args?: { endpoint: string; endpointSsl: string; updateUrl: string; c2dmAccount: string; nniServer: string; });
}

export class TalkException extends Thrift.TException {
    code: ErrorCode;
    reason: string;
    parameterMap: { [k: string]: string; };

    constructor(args?: { code: ErrorCode; reason: string; parameterMap: { [k: string]: string; }; });
}

export class Ticket {
    id: string;
    expirationTime: number;
    maxUseCount: number;

    constructor(args?: { id: string; expirationTime: number; maxUseCount: number; });
}

export class TMessageBox {
    id: string;
    channelId: string;
    lastSeq: number;
    unreadCount: number;
    lastModifiedTime: number;
    status: number;
    midType: MIDType;
    lastMessages: Message[];

    constructor(args?: { id: string; channelId: string; lastSeq: number; unreadCount: number; lastModifiedTime: number; status: number; midType: MIDType; lastMessages: Message[]; });
}

export class TMessageBoxWrapUp {
    messageBox: TMessageBox;
    name: string;
    contacts: Contact[];
    pictureRevision: string;

    constructor(args?: { messageBox: TMessageBox; name: string; contacts: Contact[]; pictureRevision: string; });
}

export class TMessageBoxWrapUpResponse {
    messageBoxWrapUpList: TMessageBoxWrapUp[];
    totalSize: number;

    constructor(args?: { messageBoxWrapUpList: TMessageBoxWrapUp[]; totalSize: number; });
}

export class TMessageReadRange {
    chatId: string;
    ranges: { [k: string]: TMessageReadRangeEntry[]; };

    constructor(args?: { chatId: string; ranges: { [k: string]: TMessageReadRangeEntry[]; }; });
}

export class TMessageReadRangeEntry {
    startMessageId: number;
    endMessageId: number;
    startTime: number;
    endTime: number;

    constructor(args?: { startMessageId: number; endMessageId: number; startTime: number; endTime: number; });
}

export class UnregisterBuddyResult {
    requestId: string;
    state: BuddyResultState;
    eventNo: number;
    message: string;
    timestamp: number;
    subscriberCountToRemove: number;
    subscriberCountRemoved: number;

    constructor(args?: { requestId: string; state: BuddyResultState; eventNo: number; message: string; timestamp: number; subscriberCountToRemove: number; subscriberCountRemoved: number; });
}

export class UpdateBuddyProfileResult {
    requestId: string;
    state: BuddyResultState;
    eventNo: number;
    receiverCount: number;
    successCount: number;
    failCount: number;
    cancelCount: number;
    unregisterCount: number;
    timestamp: number;
    message: string;
    urlhash: string;

    constructor(args?: { requestId: string; state: BuddyResultState; eventNo: number; receiverCount: number; successCount: number; failCount: number; cancelCount: number; unregisterCount: number; timestamp: number; message: string; urlhash: string; });
}

export class UserAuthStatus {
    phoneNumberRegistered: boolean;
    registeredSnsIdTypes: SnsIdType[];
    accountMigrationCheckType: AccountMigrationCheckType;

    constructor(args?: { phoneNumberRegistered: boolean; registeredSnsIdTypes: SnsIdType[]; accountMigrationCheckType: AccountMigrationCheckType; });
}

export class UserTicketResponse {
    mid: string;
    userTicket: string;

    constructor(args?: { mid: string; userTicket: string; });
}

export class ValidateContactsResult {
    receiverCount: number;
    successCount: number;
    blockCount: number;
    unregisterCount: number;
    unrelatedCount: number;
    failCount: number;

    constructor(args?: { receiverCount: number; successCount: number; blockCount: number; unregisterCount: number; unrelatedCount: number; failCount: number; });
}

export class VerificationSessionData {
    sessionId: string;
    method: VerificationMethod;
    callback: string;
    normalizedPhone: string;
    countryCode: string;
    nationalSignificantNumber: string;
    availableVerificationMethods: VerificationMethod[];
    callerIdMask: string;

    constructor(args?: { sessionId: string; method: VerificationMethod; callback: string; normalizedPhone: string; countryCode: string; nationalSignificantNumber: string; availableVerificationMethods: VerificationMethod[]; callerIdMask: string; });
}

export class WapInvitation {
    type: WapInvitationType;
    inviteeEmail: string;
    inviterMid: string;
    roomMid: string;

    constructor(args?: { type: WapInvitationType; inviteeEmail: string; inviterMid: string; roomMid: string; });
}
