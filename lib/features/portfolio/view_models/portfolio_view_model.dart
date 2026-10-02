import 'package:flutter/foundation.dart';
import 'package:portfolio/data/models/project_model.dart';
import 'package:portfolio/data/repositories/portfolio_repository.dart';

class PortfolioViewModel extends ChangeNotifier {
  PortfolioViewModel({required PortfolioRepository repository})
      : _repository = repository;

  final PortfolioRepository _repository;

  List<Project> _projects = const [];
  List<Project> get projects => _projects;

  String _resumeLink = '';
  String get resumeLink => _resumeLink;

  String _resumeImageLink = '';
  String get resumeImageLink => _resumeImageLink;

  bool _isLoading = false;
  bool get isLoading => _isLoading;

  String? _errorMessage;
  String? get errorMessage => _errorMessage;

  Future<void> loadPortfolioData() async {
    _isLoading = true;
    _errorMessage = null;
    notifyListeners();

    try {
      _resumeLink = _repository.getResumeLink();
      _resumeImageLink = _repository.getResumeImageLink();
      _projects = await _repository.getProjects();
    } catch (e) {
      _errorMessage = 'Failed to load portfolio data: $e';
      debugPrint(_errorMessage);
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
