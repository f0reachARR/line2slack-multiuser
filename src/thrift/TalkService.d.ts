import * as Thrift from 'thrift';
import {
    AnalyticsInfo,
    Announcement,
    AuthQrcode,
    CarrierCode,
    ClientLastStatus,
    CommitMessageResult,
    CommitSendMessagesToMidRequest,
    CommitSendMessagesToMidResponse,
    CompactContact,
    Configurations,
    Contact,
    ContactModification,
    ContactRegistration,
    ContactReport,
    ContactReportResult,
    ContactSetting,
    ContactTransition,
    ContactType,
    CustomMode,
    DeviceInfo,
    E2EEGroupSharedKey,
    E2EENegotiationResult,
    E2EEPublicKey,
    EmailConfirmation,
    EmailConfirmationResult,
    EmailConfirmationSession,
    ErrorCode,
    ExtendedProfile,
    ExtendedProfileAttribute,
    FeatureType,
    FriendRequest,
    FriendRequestDirection,
    FriendRequestMethod,
    FriendRequestsInfo,
    Group,
    IdentityCredential,
    IdentityProvider,
    LoginResult,
    LoginSession,
    Message,
    MessageBoxV2MessageId,
    MIDType,
    NearbyEntry,
    NotificationStatus,
    NotificationType,
    Operation,
    PhoneVerificationResult,
    Profile,
    ProfileAttribute,
    ProximityMatchCandidateResult,
    PublicKeychain,
    RegisterWithPhoneNumberResult,
    RegisterWithSnsIdResult,
    ReportCategory,
    RingbackTone,
    Room,
    RSAKey,
    SendPostbackRequest,
    Settings,
    SettingsAttribute,
    SIMInfo,
    SnsFriendContactRegistration,
    SnsFriendModification,
    SnsIdType,
    SnsIdUserStatus,
    SpammerReason,
    SuggestDictionaryIncrements,
    SuggestDictionaryRevisions,
    SuggestDictionarySettings,
    SyncActionType,
    SyncCategory,
    SystemConfiguration,
    Ticket,
    TMessageBox,
    TMessageBoxWrapUp,
    TMessageBoxWrapUpResponse,
    TMessageReadRange,
    TrackingType,
    UserAuthStatus,
    VerificationMethod,
    VerificationResult,
    VerificationSessionData,
    WapInvitation
} from './talk_types';
export as namespace TalkService;

declare class Client {
    input: Thrift.TJSONProtocol;
    output: Thrift.TJSONProtocol;
    seqid: number;

    constructor(input: Thrift.TJSONProtocol, output?: Thrift.TJSONProtocol);

    reportDeviceState(booleanState: { [k: number /*DeviceBooleanStateKey*/]: boolean; }, stringState: { [k: number /*DeviceStringStateKey*/]: string; }): void;

    reportDeviceState(booleanState: { [k: number /*DeviceBooleanStateKey*/]: boolean; }, stringState: { [k: number /*DeviceStringStateKey*/]: string; }, callback: Function): void;

    notifySleepV2(lastStatusMap: { [k: number /*ServiceCode*/]: ClientLastStatus; }): void;

    notifySleepV2(lastStatusMap: { [k: number /*ServiceCode*/]: ClientLastStatus; }, callback: Function): void;

    updateNotificationToken(token: string, type: NotificationType): void;

    updateNotificationToken(token: string, type: NotificationType, callback: Function): void;

    updateGroup(reqSeq: number, group: Group): void;

    updateGroup(reqSeq: number, group: Group, callback: Function): void;

    verifyAccountMigrationPincode(migrationPincodeSessionId: string, accountMigrationPincode: string): void;

    verifyAccountMigrationPincode(migrationPincodeSessionId: string, accountMigrationPincode: string, callback: Function): void;

    registerWithExistingSnsIdAndIdentityCredential(identityCredential: IdentityCredential, region: string, udidHash: string, deviceInfo: DeviceInfo, migrationPincodeSessionId: string): Promise<string>;

    registerWithExistingSnsIdAndIdentityCredential(identityCredential: IdentityCredential, region: string, udidHash: string, deviceInfo: DeviceInfo, migrationPincodeSessionId: string, callback: Function): void;

    registerDeviceWithoutPhoneNumber(region: string, udidHash: string, deviceInfo: DeviceInfo): Promise<string>;

    registerDeviceWithoutPhoneNumber(region: string, udidHash: string, deviceInfo: DeviceInfo, callback: Function): void;

    changeVerificationMethod(sessionId: string, method: VerificationMethod): Promise<VerificationSessionData>;

    changeVerificationMethod(sessionId: string, method: VerificationMethod, callback: Function): void;

    setBuddyLocation(mid: string, index: number, location: Geolocation): void;

    setBuddyLocation(mid: string, index: number, location: Geolocation, callback: Function): void;

    getFriendRequests(direction: FriendRequestDirection, lastSeenSeqId: number): Promise<FriendRequest[]>;

    getFriendRequests(direction: FriendRequestDirection, lastSeenSeqId: number, callback: Function): void;

    kickoutFromGroup(reqSeq: number, groupId: string, contactIds: string[]): void;

    kickoutFromGroup(reqSeq: number, groupId: string, contactIds: string[], callback: Function): void;

    verifyIdentityCredentialWithResult(identityCredential: IdentityCredential, migrationPincodeSessionId: string): Promise<UserAuthStatus>;

    verifyIdentityCredentialWithResult(identityCredential: IdentityCredential, migrationPincodeSessionId: string, callback: Function): void;

    sendEchoPush(text: string): void;

    sendEchoPush(text: string, callback: Function): void;

    createSession(): Promise<string>;

    createSession(callback: Function): void;

    reissueDeviceCredential(): Promise<string>;

    reissueDeviceCredential(callback: Function): void;

    getRecommendationIds(): Promise<string[]>;

    getRecommendationIds(callback: Function): void;

    inviteViaEmail(reqSeq: number, email: string, name: string): void;

    inviteViaEmail(reqSeq: number, email: string, name: string, callback: Function): void;

    getRoomsV2(roomIds: string[]): Promise<Room[]>;

    getRoomsV2(roomIds: string[], callback: Function): void;

    getReadMessageOps(chatId: string): Promise<Operation[]>;

    getReadMessageOps(chatId: string, callback: Function): void;

    getSettingsAttributes(attrBitset: number): Promise<Settings>;

    getSettingsAttributes(attrBitset: number, callback: Function): void;

    requestIdentityUnbind(identifier: string, provider: IdentityProvider): void;

    requestIdentityUnbind(identifier: string, provider: IdentityProvider, callback: Function): void;

    getMessagesBySequenceNumber(channelId: string, messageBoxId: string, startSeq: number, endSeq: number): Promise<Message[]>;

    getMessagesBySequenceNumber(channelId: string, messageBoxId: string, startSeq: number, endSeq: number, callback: Function): void;

    inviteIntoRoom(reqSeq: number, roomId: string, contactIds: string[]): void;

    inviteIntoRoom(reqSeq: number, roomId: string, contactIds: string[], callback: Function): void;

    sendChatChecked(seq: number, consumer: string, lastMessageId: string, sessionId: any): Promise<void>;

    sendChatChecked(seq: number, consumer: string, lastMessageId: string, sessionId: any, callback: Function): void;

    removeSnsId(snsIdType: SnsIdType): Promise<string>;

    removeSnsId(snsIdType: SnsIdType, callback: Function): void;

    reportSpammer(spammerMid: string, spammerReasons: SpammerReason[], spamMessageIds: string[], spamMessages: string[]): void;

    reportSpammer(spammerMid: string, spammerReasons: SpammerReason[], spamMessageIds: string[], spamMessages: string[], callback: Function): void;

    findAndAddContactsByEmail(reqSeq: number, emails: string[]): Promise<{ [k: string]: Contact; }>;

    findAndAddContactsByEmail(reqSeq: number, emails: string[], callback: Function): void;

    getCompactGroups(groupIds: string[]): Promise<Group[]>;

    getCompactGroups(groupIds: string[], callback: Function): void;

    sendMessage(seq: number, message: Message): Promise<Message>;

    sendMessage(seq: number, message: Message, callback: Function): void;

    getRooms(roomIds: string[]): Promise<Room[]>;

    getRooms(roomIds: string[], callback: Function): void;

    updateC2DMRegistrationId(registrationId: string): void;

    updateC2DMRegistrationId(registrationId: string, callback: Function): void;

    sendPostback(request: SendPostbackRequest): void;

    sendPostback(request: SendPostbackRequest, callback: Function): void;

    getReadMessageOpsInBulk(chatIds: string[]): Promise<Operation[]>;

    getReadMessageOpsInBulk(chatIds: string[], callback: Function): void;

    sendMessageIgnored(seq: number, consumer: string, messageIds: string[]): void;

    sendMessageIgnored(seq: number, consumer: string, messageIds: string[], callback: Function): void;

    getMessageBoxWrapUpListV2(messageBoxOffset: number, messageBoxCount: number): Promise<TMessageBoxWrapUpResponse>;

    getMessageBoxWrapUpListV2(messageBoxOffset: number, messageBoxCount: number, callback: Function): void;

    getOldReadMessageOpsWithRange(startRev: number, endRev: number): Promise<Operation[]>;

    getOldReadMessageOpsWithRange(startRev: number, endRev: number, callback: Function): void;

    getRSAKeyInfo(provider: IdentityProvider): Promise<RSAKey>;

    getRSAKeyInfo(provider: IdentityProvider, callback: Function): void;

    updateProfileAttribute(reqSeq: number, attr: ProfileAttribute, value: string): void;

    updateProfileAttribute(reqSeq: number, attr: ProfileAttribute, value: string, callback: Function): void;

    createAccountMigrationPincodeSession(): Promise<string>;

    createAccountMigrationPincodeSession(callback: Function): void;

    notifiedRedirect(paramMap: { [k: string]: string; }): void;

    notifiedRedirect(paramMap: { [k: string]: string; }, callback: Function): void;

    notifyIndividualEvent(notificationStatus: NotificationStatus, receiverMids: string[]): void;

    notifyIndividualEvent(notificationStatus: NotificationStatus, receiverMids: string[], callback: Function): void;

    updateApnsDeviceToken(apnsDeviceToken: string): void;

    updateApnsDeviceToken(apnsDeviceToken: string, callback: Function): void;

    getMessageBoxCompactWrapUpListV2(messageBoxOffset: number, messageBoxCount: number): Promise<TMessageBoxWrapUpResponse>;

    getMessageBoxCompactWrapUpListV2(messageBoxOffset: number, messageBoxCount: number, callback: Function): void;

    requestEmailConfirmation(emailConfirmation: EmailConfirmation): Promise<EmailConfirmationSession>;

    requestEmailConfirmation(emailConfirmation: EmailConfirmation, callback: Function): void;

    registerWithSnsIdAndIdentityCredential(snsIdType: SnsIdType, snsAccessToken: string, identityCredential: IdentityCredential, region: string, udidHash: string, deviceInfo: DeviceInfo, migrationPincodeSessionId: string): Promise<string>;

    registerWithSnsIdAndIdentityCredential(snsIdType: SnsIdType, snsAccessToken: string, identityCredential: IdentityCredential, region: string, udidHash: string, deviceInfo: DeviceInfo, migrationPincodeSessionId: string, callback: Function): void;

    getMessageBoxCompactWrapUp(mid: string): Promise<TMessageBoxWrapUp>;

    getMessageBoxCompactWrapUp(mid: string, callback: Function): void;

    findContactByUserTicket(ticketIdWithTag: string): Promise<Contact>;

    findContactByUserTicket(ticketIdWithTag: string, callback: Function): void;

    updateAccountMigrationPincode(accountMigrationPincode: string): void;

    updateAccountMigrationPincode(accountMigrationPincode: string, callback: Function): void;

    registerBuddyUser(buddyId: string, registrarPassword: string): Promise<string>;

    registerBuddyUser(buddyId: string, registrarPassword: string, callback: Function): void;

    updateSettings2(reqSeq: number, settings: Settings): Promise<number>;

    updateSettings2(reqSeq: number, settings: Settings, callback: Function): void;

    getUserTicket(): Promise<Ticket>;

    getUserTicket(callback: Function): void;

    fetchOps(localRev: number, count: number, globalRev: number, individualRev: number): Promise<Operation[]>;

    fetchOps(localRev: number, count: number, globalRev: number, individualRev: number, callback: Function): void;

    commitSendMessagesToMid(request: CommitSendMessagesToMidRequest): Promise<CommitSendMessagesToMidResponse>;

    commitSendMessagesToMid(request: CommitSendMessagesToMidRequest, callback: Function): void;

    getMessageBoxV2(messageBoxId: string, lastMessagesCount: number): Promise<TMessageBox>;

    getMessageBoxV2(messageBoxId: string, lastMessagesCount: number, callback: Function): void;

    requestResendMessage(reqSeq: number, senderMid: string, messageId: string): void;

    requestResendMessage(reqSeq: number, senderMid: string, messageId: string, callback: Function): void;

    getGroupWithoutMembers(groupId: string): Promise<Group>;

    getGroupWithoutMembers(groupId: string, callback: Function): void;

    removeAllMessages(seq: number, lastMessageId: string): void;

    removeAllMessages(seq: number, lastMessageId: string, callback: Function): void;

    verifyAccountMigration(migrationSessionId: string): void;

    verifyAccountMigration(migrationSessionId: string, callback: Function): void;

    reissueGroupTicket(groupMid: string): Promise<string>;

    reissueGroupTicket(groupMid: string, callback: Function): void;

    logoutSession(tokenKey: string): void;

    logoutSession(tokenKey: string, callback: Function): void;

    getBuddyLocation(mid: string, index: number): Promise<Geolocation>;

    getBuddyLocation(mid: string, index: number, callback: Function): void;

    getWapInvitation(invitationHash: string): Promise<WapInvitation>;

    getWapInvitation(invitationHash: string, callback: Function): void;

    registerDevice(sessionId: string, migrationPincodeSessionId: string): Promise<string>;

    registerDevice(sessionId: string, migrationPincodeSessionId: string, callback: Function): void;

    clearMessageBox(channelId: string, messageBoxId: string): void;

    clearMessageBox(channelId: string, messageBoxId: string, callback: Function): void;

    loginWithIdentityCredentialForCertificate(identifier: string, password: string, keepLoggedIn: boolean, accessLocation: string, systemName: string, identityProvider: IdentityProvider, certificate: string): Promise<LoginResult>;

    loginWithIdentityCredentialForCertificate(identifier: string, password: string, keepLoggedIn: boolean, accessLocation: string, systemName: string, identityProvider: IdentityProvider, certificate: string, callback: Function): void;

    getSuggestSettings(locale: string): Promise<SuggestDictionarySettings>;

    getSuggestSettings(locale: string, callback: Function): void;

    updateAndGetNearby(latitude: number, longitude: number): Promise<NearbyEntry[]>;

    updateAndGetNearby(latitude: number, longitude: number, callback: Function): void;

    syncContactBySnsIds(reqSeq: number, modifications: SnsFriendModification[]): Promise<SnsFriendContactRegistration[]>;

    syncContactBySnsIds(reqSeq: number, modifications: SnsFriendModification[], callback: Function): void;

    getContacts(ids: string[]): Promise<Contact[]>;

    getContacts(ids: string[], callback: Function): void;

    getMessageBoxCompactWrapUpList(start: number, messageBoxCount: number): Promise<TMessageBoxWrapUpResponse>;

    getMessageBoxCompactWrapUpList(start: number, messageBoxCount: number, callback: Function): void;

    getProximityMatchCandidates(sessionId: string): Promise<Contact[]>;

    getProximityMatchCandidates(sessionId: string, callback: Function): void;

    updateExtendedProfileAttribute(reqSeq: number, attr: ExtendedProfileAttribute, extendedProfile: ExtendedProfile): void;

    updateExtendedProfileAttribute(reqSeq: number, attr: ExtendedProfileAttribute, extendedProfile: ExtendedProfile, callback: Function): void;

    resendPinCode(sessionId: string): void;

    resendPinCode(sessionId: string, callback: Function): void;

    reportSettings(syncOpRevision: number, settings: Settings): void;

    reportSettings(syncOpRevision: number, settings: Settings, callback: Function): void;

    registerBuddyUserid(seq: number, userid: string): void;

    registerBuddyUserid(seq: number, userid: string, callback: Function): void;

    findGroupByTicket(ticketId: string): Promise<Group>;

    findGroupByTicket(ticketId: string, callback: Function): void;

    registerDeviceWithIdentityCredential(sessionId: string, identifier: string, verifier: string, provider: IdentityProvider, migrationPincodeSessionId: string): Promise<string>;

    registerDeviceWithIdentityCredential(sessionId: string, identifier: string, verifier: string, provider: IdentityProvider, migrationPincodeSessionId: string, callback: Function): void;

    invalidateUserTicket(): void;

    invalidateUserTicket(callback: Function): void;

    sendEvent(seq: number, message: Message): Promise<Message>;

    sendEvent(seq: number, message: Message, callback: Function): void;

    sendMessageToMyHome(seq: number, message: Message): Promise<Message>;

    sendMessageToMyHome(seq: number, message: Message, callback: Function): void;

    sendContentPreviewUpdated(esq: number, messageId: string, receiverMids: string[]): Promise<{ [k: string]: string; }>;

    sendContentPreviewUpdated(esq: number, messageId: string, receiverMids: string[], callback: Function): void;

    loginWithVerifier(verifier: string): Promise<string>;

    loginWithVerifier(verifier: string, callback: Function): void;

    removeBuddySubscriptionAndNotifyBuddyUnregistered(subscriberMids: string[]): void;

    removeBuddySubscriptionAndNotifyBuddyUnregistered(subscriberMids: string[], callback: Function): void;

    unblockContact(reqSeq: number, id: string, reference: string): void;

    unblockContact(reqSeq: number, id: string, reference: string, callback: Function): void;

    removeBuddyLocation(mid: string, index: number): void;

    removeBuddyLocation(mid: string, index: number, callback: Function): void;

    getRingbackTone(): Promise<RingbackTone>;

    getRingbackTone(callback: Function): void;

    getConfigurations(revision: number, regionOfUsim: string, regionOfTelephone: string, regionOfLocale: string, carrier: string): Promise<Configurations>;

    getConfigurations(revision: number, regionOfUsim: string, regionOfTelephone: string, regionOfLocale: string, carrier: string, callback: Function): void;

    getProximityMatchCandidateList(sessionId: string): Promise<ProximityMatchCandidateResult>;

    getProximityMatchCandidateList(sessionId: string, callback: Function): void;

    requestAccountPasswordReset(identifier: string, provider: IdentityProvider, locale: string): void;

    requestAccountPasswordReset(identifier: string, provider: IdentityProvider, locale: string, callback: Function): void;

    getNextMessages(messageBoxId: string, startSeq: number, messagesCount: number): Promise<Message[]>;

    getNextMessages(messageBoxId: string, startSeq: number, messagesCount: number, callback: Function): void;

    reportProfile(syncOpRevision: number, profile: Profile): void;

    reportProfile(syncOpRevision: number, profile: Profile, callback: Function): void;

    getCompactRoom(roomId: string): Promise<Room>;

    getCompactRoom(roomId: string, callback: Function): void;

    getLastOpRevision(): Promise<number>;

    getLastOpRevision(callback: Function): void;

    getPreviousMessagesV2(messageBoxId: string, endMessageId: MessageBoxV2MessageId, messagesCount: number): Promise<Message[]>;

    getPreviousMessagesV2(messageBoxId: string, endMessageId: MessageBoxV2MessageId, messagesCount: number, callback: Function): void;

    fetchAnnouncements(lastFetchedIndex: number): Promise<Announcement[]>;

    fetchAnnouncements(lastFetchedIndex: number, callback: Function): void;

    acquireCallRoute(to: string): Promise<string[]>;

    acquireCallRoute(to: string, callback: Function): void;

    updateSettingsAttribute(reqSeq: number, attr: SettingsAttribute, value: string): void;

    updateSettingsAttribute(reqSeq: number, attr: SettingsAttribute, value: string, callback: Function): void;

    createGroupV2(seq: number, name: string, contactIds: string[]): Promise<Group>;

    createGroupV2(seq: number, name: string, contactIds: string[], callback: Function): void;

    isIdentityIdentifierAvailable(identifier: string, provider: IdentityProvider): Promise<boolean>;

    isIdentityIdentifierAvailable(identifier: string, provider: IdentityProvider, callback: Function): void;

    blockContact(reqSeq: number, id: string): void;

    blockContact(reqSeq: number, id: string, callback: Function): void;

    commitUpdateProfile(seq: number, attrs: ProfileAttribute[], receiverMids: string[]): Promise<{ [k: string]: string; }>;

    commitUpdateProfile(seq: number, attrs: ProfileAttribute[], receiverMids: string[], callback: Function): void;

    registerWithSnsId(snsIdType: SnsIdType, snsAccessToken: string, region: string, udidHash: string, deviceInfo: DeviceInfo, mid: string, migrationPincodeSessionId: string): Promise<RegisterWithSnsIdResult>;

    registerWithSnsId(snsIdType: SnsIdType, snsAccessToken: string, region: string, udidHash: string, deviceInfo: DeviceInfo, mid: string, migrationPincodeSessionId: string, callback: Function): void;

    updatePublicKeychain(publicKeychain: PublicKeychain): Promise<PublicKeychain>;

    updatePublicKeychain(publicKeychain: PublicKeychain, callback: Function): void;

    loginWithVerifierForCerificate(verifier: string): Promise<LoginResult>;

    loginWithVerifierForCerificate(verifier: string, callback: Function): void;

    tryFriendRequest(midOrEMid: string, method: FriendRequestMethod, friendRequestParams: string): void;

    tryFriendRequest(midOrEMid: string, method: FriendRequestMethod, friendRequestParams: string, callback: Function): void;

    getBlockedRecommendationIds(): Promise<string[]>;

    getBlockedRecommendationIds(callback: Function): void;

    getGroupIdsInvited(): Promise<string[]>;

    getGroupIdsInvited(callback: Function): void;

    getSuggestIncrements(revisions: SuggestDictionaryRevisions): Promise<SuggestDictionaryIncrements>;

    getSuggestIncrements(revisions: SuggestDictionaryRevisions, callback: Function): void;

    resendPinCodeBySMS(sessionId: string): void;

    resendPinCodeBySMS(sessionId: string, callback: Function): void;

    registerWithPhoneNumber(sessionId: string, migrationPincodeSessionId: string): Promise<RegisterWithPhoneNumberResult>;

    registerWithPhoneNumber(sessionId: string, migrationPincodeSessionId: string, callback: Function): void;

    getActiveBuddySubscriberIds(): Promise<string[]>;

    getActiveBuddySubscriberIds(callback: Function): void;

    createRoom(reqSeq: number, contactIds: string[]): Promise<Room>;

    createRoom(reqSeq: number, contactIds: string[], callback: Function): void;

    verifyPhoneNumberForLogin(verifierFromPhone: string, pinCodeForPhone: string, verifierFromLogin: string): Promise<string>;

    verifyPhoneNumberForLogin(verifierFromPhone: string, pinCodeForPhone: string, verifierFromLogin: string, callback: Function): void;

    addSnsId(snsIdType: SnsIdType, snsAccessToken: string): Promise<string>;

    addSnsId(snsIdType: SnsIdType, snsAccessToken: string, callback: Function): void;

    finishUpdateVerification(sessionId: string): void;

    finishUpdateVerification(sessionId: string, callback: Function): void;

    validateContactsOnBot(contacts: string[]): Promise<{ [k: string]: string; }>;

    validateContactsOnBot(contacts: string[], callback: Function): void;

    getRoom(roomId: string): Promise<Room>;

    getRoom(roomId: string, callback: Function): void;

    closeProximityMatch(sessionId: string): void;

    closeProximityMatch(sessionId: string, callback: Function): void;

    getCompactGroup(groupId: string): Promise<Group>;

    getCompactGroup(groupId: string, callback: Function): void;

    getBlockedContactIdsByRange(start: number, count: number): Promise<string[]>;

    getBlockedContactIdsByRange(start: number, count: number, callback: Function): void;

    getRecentMessagesV2(messageBoxId: string, messagesCount: number): Promise<Message[]>;

    getRecentMessagesV2(messageBoxId: string, messagesCount: number, callback: Function): void;

    reissueUserTicket(expirationTime: number, maxUseCount: number): Promise<string>;

    reissueUserTicket(expirationTime: number, maxUseCount: number, callback: Function): void;

    getMessageReadRange(chatIds: string[]): Promise<TMessageReadRange[]>;

    getMessageReadRange(chatIds: string[], callback: Function): void;

    clearRingbackTone(): void;

    clearRingbackTone(callback: Function): void;

    setIdentityCredential(identifier: string, verifier: string, provider: IdentityProvider): void;

    setIdentityCredential(identifier: string, verifier: string, provider: IdentityProvider, callback: Function): void;

    getMessageBoxCompactWrapUpV2(messageBoxId: string): Promise<TMessageBoxWrapUp>;

    getMessageBoxCompactWrapUpV2(messageBoxId: string, callback: Function): void;

    getServerTime(): Promise<number>;

    getServerTime(callback: Function): void;

    trySendMessage(seq: number, message: Message): Promise<Message>;

    trySendMessage(seq: number, message: Message, callback: Function): void;

    getNextMessagesV2(messageBoxId: string, startMessageId: MessageBoxV2MessageId, messagesCount: number): Promise<Message[]>;

    getNextMessagesV2(messageBoxId: string, startMessageId: MessageBoxV2MessageId, messagesCount: number, callback: Function): void;

    notifySleep(lastRev: number, badge: number): void;

    notifySleep(lastRev: number, badge: number, callback: Function): void;

    getBuddyBlockerIds(): Promise<string[]>;

    getBuddyBlockerIds(callback: Function): void;

    removeE2EEPublicKey(publicKey: E2EEPublicKey): void;

    removeE2EEPublicKey(publicKey: E2EEPublicKey, callback: Function): void;

    reissueTrackingTicket(type: TrackingType): Promise<string>;

    reissueTrackingTicket(type: TrackingType, callback: Function): void;

    cancelGroupInvitation(reqSeq: number, groupId: string, contactIds: string[]): void;

    cancelGroupInvitation(reqSeq: number, groupId: string, contactIds: string[], callback: Function): void;

    removeMessage(messageId: string): Promise<boolean>;

    removeMessage(messageId: string, callback: Function): void;

    getAllReadMessageOps(): Promise<Operation[]>;

    getAllReadMessageOps(callback: Function): void;

    unregisterUserAndDevice(): Promise<string>;

    unregisterUserAndDevice(callback: Function): void;

    acceptGroupInvitation(reqSeq: number, groupId: string): void;

    acceptGroupInvitation(reqSeq: number, groupId: string, callback: Function): void;

    getCompactContactsModifiedSince(timestamp: number): Promise<CompactContact[]>;

    getCompactContactsModifiedSince(timestamp: number, callback: Function): void;

    releaseSession(): void;

    releaseSession(callback: Function): void;

    findContactsByPhone(phones: string[]): Promise<{ [k: string]: Contact; }>;

    findContactsByPhone(phones: string[], callback: Function): void;

    getHiddenContactMids(): Promise<string[]>;

    getHiddenContactMids(callback: Function): void;

    getEncryptedIdentity(): Promise<string>;

    getEncryptedIdentity(callback: Function): void;

    updateProfile(reqSeq: number, profile: Profile): void;

    updateProfile(reqSeq: number, profile: Profile, callback: Function): void;

    reportSpam(chatMid: string, memberMids: string[], spammerReasons: SpammerReason[], senderMids: string[], spamMessageIds: string[], spamMessages: string[]): void;

    reportSpam(chatMid: string, memberMids: string[], spammerReasons: SpammerReason[], senderMids: string[], spamMessageIds: string[], spamMessages: string[], callback: Function): void;

    getSuggestRevisions(): Promise<SuggestDictionaryRevisions>;

    getSuggestRevisions(callback: Function): void;

    getPreviousMessagesV2WithReadCount(messageBoxId: string, endMessageId: MessageBoxV2MessageId, messagesCount: number): Promise<Message[]>;

    getPreviousMessagesV2WithReadCount(messageBoxId: string, endMessageId: MessageBoxV2MessageId, messagesCount: number, callback: Function): void;

    fetchOperations(localRev: number, count: number): Promise<Operation[]>;

    fetchOperations(localRev: number, count: number, callback: Function): void;

    registerWapDevice(invitationHash: string, guidHash: string, email: string, deviceInfo: DeviceInfo): Promise<string>;

    registerWapDevice(invitationHash: string, guidHash: string, email: string, deviceInfo: DeviceInfo, callback: Function): void;

    getRecentFriendRequests(): Promise<FriendRequestsInfo>;

    getRecentFriendRequests(callback: Function): void;

    notifyBuddyOnAir(seq: number, receiverMids: string[]): Promise<{ [k: string]: string; }>;

    notifyBuddyOnAir(seq: number, receiverMids: string[], callback: Function): void;

    getLastAnnouncementIndex(): Promise<number>;

    getLastAnnouncementIndex(callback: Function): void;

    sendMessageAwaitCommit(seq: number, message: Message): Promise<CommitMessageResult>;

    sendMessageAwaitCommit(seq: number, message: Message, callback: Function): void;

    negotiateE2EEPublicKey(mid: string): Promise<E2EENegotiationResult>;

    negotiateE2EEPublicKey(mid: string, callback: Function): void;

    registerE2EEGroupKey(version: number, chatMid: string, members: string[], keyIds: number[], encryptedSharedKeys: string[]): Promise<E2EEGroupSharedKey>;

    registerE2EEGroupKey(version: number, chatMid: string, members: string[], keyIds: number[], encryptedSharedKeys: string[], callback: Function): void;

    findSnsIdUserStatus(snsIdType: SnsIdType, snsAccessToken: string, udidHash: string, migrationPincodeSessionId: string, oldUdidHash: string): Promise<SnsIdUserStatus>;

    findSnsIdUserStatus(snsIdType: SnsIdType, snsAccessToken: string, udidHash: string, migrationPincodeSessionId: string, oldUdidHash: string, callback: Function): void;

    notifyUpdated(lastRev: number, deviceInfo: DeviceInfo, udidHash: string, oldUdidHash: string): void;

    notifyUpdated(lastRev: number, deviceInfo: DeviceInfo, udidHash: string, oldUdidHash: string, callback: Function): void;

    reportGroups(syncOpRevision: number, groups: Group[]): void;

    reportGroups(syncOpRevision: number, groups: Group[], callback: Function): void;

    getNotificationPolicy(carrier: CarrierCode): Promise<NotificationType[]>;

    getNotificationPolicy(carrier: CarrierCode, callback: Function): void;

    findAndAddContactsByUserid(reqSeq: number, userid: string): Promise<{ [k: string]: Contact; }>;

    findAndAddContactsByUserid(reqSeq: number, userid: string, callback: Function): void;

    getLastE2EEGroupSharedKey(version: number, chatMid: string): Promise<E2EEGroupSharedKey>;

    getLastE2EEGroupSharedKey(version: number, chatMid: string, callback: Function): void;

    notifyUpdatePublicKeychain(mid: string): void;

    notifyUpdatePublicKeychain(mid: string, callback: Function): void;

    report(syncOpRevision: number, category: SyncCategory, report: string): void;

    report(syncOpRevision: number, category: SyncCategory, report: string, callback: Function): void;

    acceptGroupInvitationByTicket(reqSeq: number, groupMid: string, ticketId: string): void;

    acceptGroupInvitationByTicket(reqSeq: number, groupMid: string, ticketId: string, callback: Function): void;

    getContactRegistration(id: string, type: ContactType): Promise<ContactRegistration>;

    getContactRegistration(id: string, type: ContactType, callback: Function): void;

    updateContactSetting(reqSeq: number, mid: string, flag: ContactSetting, value: string): void;

    updateContactSetting(reqSeq: number, mid: string, flag: ContactSetting, value: string, callback: Function): void;

    getContactWithFriendRequestStatus(id: string): Promise<Contact>;

    getContactWithFriendRequestStatus(id: string, callback: Function): void;

    getMessageBoxListByStatus(channelId: string, lastMessagesCount: number, status: number): Promise<TMessageBox[]>;

    getMessageBoxListByStatus(channelId: string, lastMessagesCount: number, status: number, callback: Function): void;

    openProximityMatch(location: Location): Promise<string>;

    openProximityMatch(location: Location, callback: Function): void;

    logout(): void;

    logout(callback: Function): void;

    getE2EEPublicKey(mid: string, version: number, keyId: number): Promise<E2EEPublicKey>;

    getE2EEPublicKey(mid: string, version: number, keyId: number, callback: Function): void;

    registerUserid(reqSeq: number, userid: string): Promise<boolean>;

    registerUserid(reqSeq: number, userid: string, callback: Function): void;

    reportContacts(syncOpRevision: number, category: SyncCategory, contactReports: ContactReport[], actionType: SyncActionType): Promise<ContactReportResult[]>;

    reportContacts(syncOpRevision: number, category: SyncCategory, contactReports: ContactReport[], actionType: SyncActionType, callback: Function): void;

    getPublicKeychain(mid: string): Promise<PublicKeychain>;

    getPublicKeychain(mid: string, callback: Function): void;

    sendContentReceipt(seq: number, consumer: string, messageId: string): void;

    sendContentReceipt(seq: number, consumer: string, messageId: string, callback: Function): void;

    respondResendMessage(reqSeq: number, receiverMid: string, originalMessageId: string, resendMessage: Message, errorCode: ErrorCode): void;

    respondResendMessage(reqSeq: number, receiverMid: string, originalMessageId: string, resendMessage: Message, errorCode: ErrorCode, callback: Function): void;

    getAllRoomIds(): Promise<string[]>;

    getAllRoomIds(callback: Function): void;

    requestE2EEKeyExchange(reqSeq: number, temporalPublicKey: string, publicKey: E2EEPublicKey, verifier: string): void;

    requestE2EEKeyExchange(reqSeq: number, temporalPublicKey: string, publicKey: E2EEPublicKey, verifier: string, callback: Function): void;

    disableNearby(): void;

    disableNearby(callback: Function): void;

    createQrcodeBase64Image(url: string, characterSet: string, imageSize: number, x: number, y: number, width: number, height: number): Promise<string>;

    createQrcodeBase64Image(url: string, characterSet: string, imageSize: number, x: number, y: number, width: number, height: number, callback: Function): void;

    getMessageBoxList(channelId: string, lastMessagesCount: number): Promise<TMessageBox[]>;

    getMessageBoxList(channelId: string, lastMessagesCount: number, callback: Function): void;

    respondE2EEKeyExchange(reqSeq: number, encryptedKeyChain: string, hashKeyChain: string): void;

    respondE2EEKeyExchange(reqSeq: number, encryptedKeyChain: string, hashKeyChain: string, callback: Function): void;

    verifyQrcode(verifier: string, pinCode: string): Promise<string>;

    verifyQrcode(verifier: string, pinCode: string, callback: Function): void;

    updateNotificationTokenWithBytes(token: string, type: NotificationType): void;

    updateNotificationTokenWithBytes(token: string, type: NotificationType, callback: Function): void;

    getPreviousMessages(messageBoxId: string, endSeq: number, messagesCount: number): Promise<Message[]>;

    getPreviousMessages(messageBoxId: string, endSeq: number, messagesCount: number, callback: Function): void;

    getSettings(): Promise<Settings>;

    getSettings(callback: Function): void;

    getLastE2EEPublicKeys(chatMid: string): Promise<{ [k: string]: E2EEPublicKey; }>;

    getLastE2EEPublicKeys(chatMid: string, callback: Function): void;

    registerE2EEPublicKey(reqSeq: number, publicKey: E2EEPublicKey): Promise<E2EEPublicKey>;

    registerE2EEPublicKey(reqSeq: number, publicKey: E2EEPublicKey, callback: Function): void;

    acquireCallTicket(to: string): Promise<string>;

    acquireCallTicket(to: string, callback: Function): void;

    inviteIntoGroup(reqSeq: number, groupId: string, contactIds: string[]): void;

    inviteIntoGroup(reqSeq: number, groupId: string, contactIds: string[], callback: Function): void;

    makeUserAddMyselfAsContact(contactOwnerMid: string): Promise<ContactTransition>;

    makeUserAddMyselfAsContact(contactOwnerMid: string, callback: Function): void;

    removeMessageFromMyHome(messageId: string): Promise<boolean>;

    removeMessageFromMyHome(messageId: string, callback: Function): void;

    commitSendMessages(seq: number, messageIds: string[], receiverMids: string[], onlyToFollowers: boolean): Promise<{ [k: string]: string; }>;

    commitSendMessages(seq: number, messageIds: string[], receiverMids: string[], onlyToFollowers: boolean, callback: Function): void;

    registerWithPhoneNumberAndPassword(sessionId: string, keynm: string, encrypted: string): Promise<RegisterWithPhoneNumberResult>;

    registerWithPhoneNumberAndPassword(sessionId: string, keynm: string, encrypted: string, callback: Function): void;

    leaveGroup(reqSeq: number, groupId: string): void;

    leaveGroup(reqSeq: number, groupId: string, callback: Function): void;

    getAnalyticsInfo(): Promise<AnalyticsInfo>;

    getAnalyticsInfo(callback: Function): void;

    reportClientStatistics(reqSeq: number, category: ReportCategory, count: number): void;

    reportClientStatistics(reqSeq: number, category: ReportCategory, count: number, callback: Function): void;

    acceptProximityMatches(sessionId: string, ids: string[]): void;

    acceptProximityMatches(sessionId: string, ids: string[], callback: Function): void;

    getGroup(groupId: string): Promise<Group>;

    getGroup(groupId: string, callback: Function): void;

    clearIdentityCredential(): void;

    clearIdentityCredential(callback: Function): void;

    getUpdatedMessageBoxIds(startMessageId: MessageBoxV2MessageId, startMessageBoxId: string, messageBoxCount: number): Promise<string[]>;

    getUpdatedMessageBoxIds(startMessageId: MessageBoxV2MessageId, startMessageBoxId: string, messageBoxCount: number, callback: Function): void;

    getGroups(groupIds: string[]): Promise<Group[]>;

    getGroups(groupIds: string[], callback: Function): void;

    sendMessageReceipt(seq: number, consumer: string, messageIds: string[]): void;

    sendMessageReceipt(seq: number, consumer: string, messageIds: string[], callback: Function): void;

    findContactByMetaTag(userid: string, reference: string): Promise<Contact>;

    findContactByMetaTag(userid: string, reference: string, callback: Function): void;

    destroyMessage(seq: number, chatId: string, messageId: string, sessionId: any): void;

    destroyMessage(seq: number, chatId: string, messageId: string, sessionId: any, callback: Function): void;

    generateUserTicket(expirationTime: number, maxUseCount: number): Promise<Ticket>;

    generateUserTicket(expirationTime: number, maxUseCount: number, callback: Function): void;

    registerDeviceWithoutPhoneNumberWithIdentityCredential(region: string, udidHash: string, deviceInfo: DeviceInfo, provider: IdentityProvider, identifier: string, verifier: string, mid: string, migrationPincodeSessionId: string): Promise<string>;

    registerDeviceWithoutPhoneNumberWithIdentityCredential(region: string, udidHash: string, deviceInfo: DeviceInfo, provider: IdentityProvider, identifier: string, verifier: string, mid: string, migrationPincodeSessionId: string, callback: Function): void;

    getFavoriteMids(): Promise<string[]>;

    getFavoriteMids(callback: Function): void;

    getAcceptedProximityMatches(sessionId: string): Promise<string[]>;

    getAcceptedProximityMatches(sessionId: string, callback: Function): void;

    notifyInstalled(udidHash: string, applicationTypeWithExtensions: string): void;

    notifyInstalled(udidHash: string, applicationTypeWithExtensions: string, callback: Function): void;

    getCountryWithRequestIp(): Promise<string>;

    getCountryWithRequestIp(callback: Function): void;

    getGroupsV2(groupIds: string[]): Promise<Group[]>;

    getGroupsV2(groupIds: string[], callback: Function): void;

    loginWithIdentityCredential(identifier: string, password: string, keepLoggedIn: boolean, accessLocation: string, systemName: string, identityProvider: IdentityProvider, certificate: string): Promise<string>;

    loginWithIdentityCredential(identifier: string, password: string, keepLoggedIn: boolean, accessLocation: string, systemName: string, identityProvider: IdentityProvider, certificate: string, callback: Function): void;

    startUpdateVerification(region: string, carrier: CarrierCode, phone: string, udidHash: string, deviceInfo: DeviceInfo, networkCode: string, locale: string, simInfo: SIMInfo): Promise<VerificationSessionData>;

    startUpdateVerification(region: string, carrier: CarrierCode, phone: string, udidHash: string, deviceInfo: DeviceInfo, networkCode: string, locale: string, simInfo: SIMInfo, callback: Function): void;

    getSessions(): Promise<LoginSession[]>;

    getSessions(callback: Function): void;

    updateSettings(reqSeq: number, settings: Settings): void;

    updateSettings(reqSeq: number, settings: Settings, callback: Function): void;

    getContact(id: string): Promise<Contact>;

    getContact(id: string, callback: Function): void;

    getBlockedContactIds(): Promise<string[]>;

    getBlockedContactIds(callback: Function): void;

    loginWithVerifierForCertificate(verifier: string): Promise<LoginResult>;

    loginWithVerifierForCertificate(verifier: string, callback: Function): void;

    getProfile(): Promise<Profile>;

    getProfile(callback: Function): void;

    findContactsByEmail(emails: string[]): Promise<{ [k: string]: Contact; }>;

    findContactsByEmail(emails: string[], callback: Function): void;

    getSystemConfiguration(): Promise<SystemConfiguration>;

    getSystemConfiguration(callback: Function): void;

    getRecentMessages(messageBoxId: string, messagesCount: number): Promise<Message[]>;

    getRecentMessages(messageBoxId: string, messagesCount: number, callback: Function): void;

    verifyPhone(sessionId: string, pinCode: string, udidHash: string): Promise<VerificationResult>;

    verifyPhone(sessionId: string, pinCode: string, udidHash: string, callback: Function): void;

    createGroup(seq: number, name: string, contactIds: string[]): Promise<Group>;

    createGroup(seq: number, name: string, contactIds: string[], callback: Function): void;

    updateBuddySetting(key: string, value: string): void;

    updateBuddySetting(key: string, value: string, callback: Function): void;

    updateRegion(region: string): void;

    updateRegion(region: string, callback: Function): void;

    verifyIdentityCredential(identifier: string, password: string, identityProvider: IdentityProvider): void;

    verifyIdentityCredential(identifier: string, password: string, identityProvider: IdentityProvider, callback: Function): void;

    sendChatRemoved(seq: number, consumer: string, lastMessageId: string, sessionId: any): void;

    sendChatRemoved(seq: number, consumer: string, lastMessageId: string, sessionId: any, callback: Function): void;

    getGroupIdsJoined(): Promise<string[]>;

    getGroupIdsJoined(callback: Function): void;

    findContactByUserid(userid: string): Promise<Contact>;

    findContactByUserid(userid: string, callback: Function): void;

    getE2EEPublicKeys(): Promise<E2EEPublicKey[]>;

    getE2EEPublicKeys(callback: Function): void;

    getMessageBoxWrapUpList(start: number, messageBoxCount: number): Promise<TMessageBoxWrapUpResponse>;

    getMessageBoxWrapUpList(start: number, messageBoxCount: number, callback: Function): void;

    leaveRoom(reqSeq: number, roomId: string): void;

    leaveRoom(reqSeq: number, roomId: string, callback: Function): void;

    unblockRecommendation(reqSeq: number, id: string): void;

    unblockRecommendation(reqSeq: number, id: string, callback: Function): void;

    findAndAddContactsByPhone(reqSeq: number, phones: string[]): Promise<{ [k: string]: Contact; }>;

    findAndAddContactsByPhone(reqSeq: number, phones: string[], callback: Function): void;

    getAuthQrcode(keepLoggedIn: boolean, systemName: string, returnCallbackUrl: boolean): Promise<AuthQrcode>;

    getAuthQrcode(keepLoggedIn: boolean, systemName: string, returnCallbackUrl: boolean, callback: Function): void;

    getE2EEGroupSharedKey(version: number, chatMid: string, groupKeyId: number): Promise<E2EEGroupSharedKey>;

    getE2EEGroupSharedKey(version: number, chatMid: string, groupKeyId: number, callback: Function): void;

    getMessageBoxWrapUp(mid: string): Promise<TMessageBoxWrapUp>;

    getMessageBoxWrapUp(mid: string, callback: Function): void;

    updateSettingsAttributes(reqSeq: number, attrBitset: number, settings: Settings): Promise<number>;

    updateSettingsAttributes(reqSeq: number, attrBitset: number, settings: Settings, callback: Function): void;

    startVerification(region: string, carrier: CarrierCode, phone: string, udidHash: string, deviceInfo: DeviceInfo, networkCode: string, mid: string, locale: string, simInfo: SIMInfo, oldUdidHash: string): Promise<VerificationSessionData>;

    startVerification(region: string, carrier: CarrierCode, phone: string, udidHash: string, deviceInfo: DeviceInfo, networkCode: string, mid: string, locale: string, simInfo: SIMInfo, oldUdidHash: string, callback: Function): void;

    reportRooms(syncOpRevision: number, rooms: Room[]): void;

    reportRooms(syncOpRevision: number, rooms: Room[], callback: Function): void;

    updateGroupPreferenceAttribute(reqSeq: number, groupMid: string, updatedAttrs: { [k: number /*GroupPreferenceAttribute*/]: string; }): void;

    updateGroupPreferenceAttribute(reqSeq: number, groupMid: string, updatedAttrs: { [k: number /*GroupPreferenceAttribute*/]: string; }, callback: Function): void;

    getMessageBoxWrapUpV2(messageBoxId: string): Promise<TMessageBoxWrapUp>;

    getMessageBoxWrapUpV2(messageBoxId: string, callback: Function): void;

    getCompactRooms(roomIds: string[]): Promise<Room[]>;

    getCompactRooms(roomIds: string[], callback: Function): void;

    findAndAddContactByMetaTag(reqSeq: number, userid: string, reference: string): Promise<Contact>;

    findAndAddContactByMetaTag(reqSeq: number, userid: string, reference: string, callback: Function): void;

    storeUpdateProfileAttribute(seq: number, profileAttribute: ProfileAttribute, value: string): void;

    storeUpdateProfileAttribute(seq: number, profileAttribute: ProfileAttribute, value: string, callback: Function): void;

    resendEmailConfirmation(verifier: string): Promise<EmailConfirmationSession>;

    resendEmailConfirmation(verifier: string, callback: Function): void;

    confirmEmail(verifier: string, pinCode: string): Promise<EmailConfirmationResult>;

    confirmEmail(verifier: string, pinCode: string, callback: Function): void;

    getExtendedProfile(): Promise<ExtendedProfile>;

    getExtendedProfile(callback: Function): void;

    isUseridAvailable(userid: string): Promise<boolean>;

    isUseridAvailable(userid: string, callback: Function): void;

    notifyRegistrationComplete(udidHash: string, applicationTypeWithExtensions: string): void;

    notifyRegistrationComplete(udidHash: string, applicationTypeWithExtensions: string, callback: Function): void;

    updateDeviceInfo(deviceUid: string, deviceInfo: DeviceInfo): void;

    updateDeviceInfo(deviceUid: string, deviceInfo: DeviceInfo, callback: Function): void;

    blockRecommendation(reqSeq: number, id: string): void;

    blockRecommendation(reqSeq: number, id: string, callback: Function): void;

    rejectGroupInvitation(reqSeq: number, groupId: string): void;

    rejectGroupInvitation(reqSeq: number, groupId: string, callback: Function): void;

    updateCustomModeSettings(customMode: CustomMode, paramMap: { [k: string]: string; }): void;

    updateCustomModeSettings(customMode: CustomMode, paramMap: { [k: string]: string; }, callback: Function): void;

    createRoomV2(reqSeq: number, contactIds: string[]): Promise<Room>;

    createRoomV2(reqSeq: number, contactIds: string[], callback: Function): void;

    noop(): void;

    noop(callback: Function): void;

    acquireEncryptedAccessToken(featureType: FeatureType): Promise<string>;

    acquireEncryptedAccessToken(featureType: FeatureType, callback: Function): void;

    getE2EEPublicKeysEx(ignoreE2EEStatus: boolean): Promise<E2EEPublicKey[]>;

    getE2EEPublicKeysEx(ignoreE2EEStatus: boolean, callback: Function): void;

    syncContacts(reqSeq: number, localContacts: ContactModification[]): Promise<{ [k: string]: ContactRegistration; }>;

    syncContacts(reqSeq: number, localContacts: ContactModification[], callback: Function): void;

    findAndAddContactsByMid(reqSeq: number, mid: string, type: ContactType, reference: string): Promise<{ [k: string]: Contact; }>;

    findAndAddContactsByMid(reqSeq: number, mid: string, type: ContactType, reference: string, callback: Function): void;

    findGroupByTicketV2(ticketId: string): Promise<Group>;

    findGroupByTicketV2(ticketId: string, callback: Function): void;

    removeFriendRequest(direction: FriendRequestDirection, midOrEMid: string): void;

    removeFriendRequest(direction: FriendRequestDirection, midOrEMid: string, callback: Function): void;

    verifyPhoneNumber(sessionId: string, pinCode: string, udidHash: string, migrationPincodeSessionId: string, oldUdidHash: string): Promise<PhoneVerificationResult>;

    verifyPhoneNumber(sessionId: string, pinCode: string, udidHash: string, migrationPincodeSessionId: string, oldUdidHash: string, callback: Function): void;

    setNotificationsEnabled(reqSeq: number, type: MIDType, target: string, enablement: boolean): void;

    setNotificationsEnabled(reqSeq: number, type: MIDType, target: string, enablement: boolean, callback: Function): void;

    getAllContactIds(): Promise<string[]>;

    getAllContactIds(callback: Function): void;

    getIdentityIdentifier(): Promise<string>;

    getIdentityIdentifier(callback: Function): void;

    sendDummyPush(): void;

    sendDummyPush(callback: Function): void;

    inviteFriendsBySms(phoneNumberList: string[]): void;

    inviteFriendsBySms(phoneNumberList: string[], callback: Function): void;

    getMessageBox(channelId: string, messageBoxId: string, lastMessagesCount: number): Promise<TMessageBox>;

    getMessageBox(channelId: string, messageBoxId: string, lastMessagesCount: number, callback: Function): void;
}
