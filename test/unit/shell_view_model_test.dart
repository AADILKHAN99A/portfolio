import 'package:flutter_test/flutter_test.dart';
import 'package:portfolio/features/shell/view_models/shell_view_model.dart';

void main() {
  group('ShellViewModel Tests', () {
    late ShellViewModel viewModel;

    setUp(() {
      viewModel = ShellViewModel();
    });

    tearDown(() {
      viewModel.dispose();
    });

    test('Initial index is 0', () {
      expect(viewModel.currentIndex, equals(0));
      expect(viewModel.pageController.initialPage, equals(0));
    });

    test('onPageChanged updates index and notifies listeners', () {
      var notified = false;
      viewModel.addListener(() {
        notified = true;
      });

      viewModel.onPageChanged(2);

      expect(viewModel.currentIndex, equals(2));
      expect(notified, isTrue);
    });

    test('onPageChanged with same index does not notify listeners', () {
      var notificationCount = 0;
      viewModel.addListener(() {
        notificationCount++;
      });

      viewModel.onPageChanged(0);

      expect(viewModel.currentIndex, equals(0));
      expect(notificationCount, equals(0));
    });

    test('animateToPage updates index and notifies listeners', () {
      var notified = false;
      viewModel.addListener(() {
        notified = true;
      });

      viewModel.animateToPage(3);

      expect(viewModel.currentIndex, equals(3));
      expect(notified, isTrue);
    });
  });
}
