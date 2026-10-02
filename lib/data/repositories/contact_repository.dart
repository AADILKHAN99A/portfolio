import 'package:portfolio/data/services/firestore_service.dart';

abstract class ContactRepository {
  Future<void> submitContactMessage({
    required String name,
    required String email,
    required String subject,
    required String message,
  });
}

class ContactRepositoryImpl implements ContactRepository {
  ContactRepositoryImpl({required FirestoreService firestoreService})
      : _firestoreService = firestoreService;

  final FirestoreService _firestoreService;

  @override
  Future<void> submitContactMessage({
    required String name,
    required String email,
    required String subject,
    required String message,
  }) async {
    await _firestoreService.sendInboxMessage(
      name: name,
      email: email,
      subject: subject,
      message: message,
    );
  }
}
