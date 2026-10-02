import 'package:firebase_storage/firebase_storage.dart';
import 'package:flutter/foundation.dart';

class StorageService {
  StorageService({FirebaseStorage? storage})
      : _storage = storage ?? FirebaseStorage.instance;

  final FirebaseStorage _storage;

  Future<String?> getProjectImageUrl({
    required String projectName,
    required String imageName,
  }) async {
    if (projectName.trim().isEmpty || imageName.trim().isEmpty) {
      return null;
    }

    try {
      final ref = _storage
          .ref()
          .child('Projects')
          .child(projectName.trim())
          .child('$imageName.png');

      return await ref.getDownloadURL();
    } catch (e) {
      debugPrint('StorageService getProjectImageUrl error for $projectName/$imageName: $e');
      return null;
    }
  }
}
