import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/foundation.dart';

class FirestoreService {
  FirestoreService({FirebaseFirestore? firestore})
      : _firestore = firestore ?? FirebaseFirestore.instance;

  final FirebaseFirestore _firestore;

  CollectionReference<Map<String, dynamic>> get _inboxCollection =>
      _firestore.collection('Inbox');

  Future<void> sendInboxMessage({
    required String name,
    required String email,
    required String subject,
    required String message,
  }) async {
    try {
      await _inboxCollection.add({
        'name': name.trim(),
        'email': email.trim(),
        'subject': subject.trim(),
        'message': message.trim(),
        'createdAt': FieldValue.serverTimestamp(),
      });
    } catch (e) {
      debugPrint('FirestoreService sendInboxMessage error: $e');
      rethrow;
    }
  }
}
