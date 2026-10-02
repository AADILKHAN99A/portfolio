import 'package:material_ui/material_ui.dart';

class AppColors {
  const AppColors._();

  // Core Palettes
  static const Color scaffoldBackground = Colors.black;
  static const Color surfaceDark = Color(0xff112742);
  static const Color appBarResumeBg = Color(0xff002746);
  static const Color transparent = Colors.transparent;

  // Text Colors
  static const Color textPrimary = Colors.white;
  static const Color textSecondary = Color(0xffebefff);
  static const Color textMuted = Colors.grey;
  static const Color accentGreen = Color(0xff83f9a8);
  static const Color aboutPageCyan = Color(0xff008494);

  // Dynamic Button Colors by Page Index using Dart 3 switch expression
  static Color getButtonColor(int pageIndex) {
    return switch (pageIndex) {
      0 => const Color(0xff353476),
      1 => const Color(0xff427154),
      2 => const Color(0xff4a4b4e),
      3 => const Color(0xff4e73aa),
      4 => Colors.white,
      _ => Colors.white,
    };
  }

  // Dynamic Background Wallpapers by Page Index
  static String getBackgroundImage(int pageIndex) {
    return switch (pageIndex) {
      0 => 'assets/bg1.jpeg',
      1 => 'assets/bg3.jpg',
      2 => 'assets/bg4.jpg',
      3 => 'assets/bg5.jpeg',
      4 => 'assets/bg6.png',
      _ => 'assets/bg1.jpeg',
    };
  }
}
