import 'package:material_ui/material_ui.dart';
import 'package:portfolio/data/repositories/contact_repository.dart';

class ContactViewModel extends ChangeNotifier {
  ContactViewModel({required ContactRepository repository})
      : _repository = repository;

  final ContactRepository _repository;

  final formKey = GlobalKey<FormState>();
  final nameController = TextEditingController();
  final emailController = TextEditingController();
  final subjectController = TextEditingController();
  final messageController = TextEditingController();

  bool _isSubmitting = false;
  bool get isSubmitting => _isSubmitting;

  String? _errorMessage;
  String? get errorMessage => _errorMessage;

  bool _isSuccess = false;
  bool get isSuccess => _isSuccess;

  Future<bool> submit() async {
    if (!formKey.currentState!.validate()) {
      return false;
    }

    _isSubmitting = true;
    _errorMessage = null;
    _isSuccess = false;
    notifyListeners();

    try {
      await _repository.submitContactMessage(
        name: nameController.text,
        email: emailController.text,
        subject: subjectController.text,
        message: messageController.text,
      );

      _isSuccess = true;
      clearForm();
      return true;
    } catch (e) {
      _errorMessage = 'Failed to send message. Please try again.';
      return false;
    } finally {
      _isSubmitting = false;
      notifyListeners();
    }
  }

  void clearForm() {
    nameController.clear();
    emailController.clear();
    subjectController.clear();
    messageController.clear();
  }

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    subjectController.dispose();
    messageController.dispose();
    super.dispose();
  }
}
