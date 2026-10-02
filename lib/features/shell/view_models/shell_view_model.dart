import 'package:material_ui/material_ui.dart';

class ShellViewModel extends ChangeNotifier {
  ShellViewModel() : pageController = PageController(initialPage: 0);

  final PageController pageController;

  int _currentIndex = 0;
  int get currentIndex => _currentIndex;

  void onPageChanged(int index) {
    if (_currentIndex != index) {
      _currentIndex = index;
      notifyListeners();
    }
  }

  void animateToPage(int index) {
    _currentIndex = index;
    notifyListeners();

    if (pageController.hasClients) {
      pageController.animateToPage(
        index,
        duration: const Duration(milliseconds: 700),
        curve: Curves.easeInOutCubic,
      );
    }
  }

  @override
  void dispose() {
    pageController.dispose();
    super.dispose();
  }
}
