import 'package:firebase_remote_config/firebase_remote_config.dart';
import 'package:flutter/foundation.dart';
import 'package:portfolio/core/constants/app_constants.dart';

class RemoteConfigService {
  RemoteConfigService({FirebaseRemoteConfig? remoteConfig})
      : _remoteConfig = remoteConfig ?? FirebaseRemoteConfig.instance;

  final FirebaseRemoteConfig _remoteConfig;

  Future<void> initialize() async {
    try {
      await _remoteConfig.setConfigSettings(
        RemoteConfigSettings(
          fetchTimeout: const Duration(seconds: 30),
          minimumFetchInterval: kDebugMode
              ? const Duration(seconds: 10)
              : const Duration(hours: 1),
        ),
      );

      await _remoteConfig.setDefaults(const {
        AppConstants.keyResumeLink: '',
        AppConstants.keyResumeImageLink: '',
        AppConstants.keyProjectData: '{"projects": []}',
      });

      final updated = await _remoteConfig.fetchAndActivate();
      debugPrint('RemoteConfigService: fetchAndActivate completed. Updated: $updated');
    } catch (e) {
      debugPrint('RemoteConfigService initialization error: $e');
    }
  }

  String getString(String key) => _remoteConfig.getString(key);

  String get resumeLink => getString(AppConstants.keyResumeLink);

  String get resumeImageLink => getString(AppConstants.keyResumeImageLink);

  String get projectsRawJson => getString(AppConstants.keyProjectData);
}
