import 'package:material_ui/material_ui.dart';
import 'package:portfolio/core/constants/app_assets.dart';
import 'package:portfolio/core/theme/app_colors.dart';
import 'package:portfolio/core/utils/responsive.dart';

class AboutView extends StatelessWidget {
  const AboutView({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = context.isMobile;

    return Center(
      child: SingleChildScrollView(
        padding: EdgeInsets.symmetric(
          horizontal: isMobile ? 24 : 48,
          vertical: 32,
        ),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 800),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Text(
                'About Me',
                style: TextStyle(
                  fontSize: isMobile ? 28 : 36,
                  fontWeight: FontWeight.w900,
                  color: AppColors.accentGreen,
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'I am Aadil Khan, Flutter & Mobile Engineer',
                style: TextStyle(
                  fontSize: isMobile ? 18 : 22,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 16),
              Text(
                'Experienced Flutter Developer skilled in cross-platform application development and creating user-friendly, high-performance interfaces. Engineering professional with a Bachelor Degree in Technology from RTU, dedicated to writing clean, maintainable, and scalable code.',
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: isMobile ? 15 : 17,
                  height: 1.6,
                ),
              ),
              const SizedBox(height: 36),
              Text(
                'Skills & Technologies',
                style: TextStyle(
                  fontSize: isMobile ? 22 : 28,
                  fontWeight: FontWeight.w800,
                  color: AppColors.accentGreen,
                ),
              ),
              const SizedBox(height: 20),
              Wrap(
                spacing: 20,
                runSpacing: 16,
                crossAxisAlignment: WrapCrossAlignment.center,
                children: [
                  _SkillIcon(assetPath: AppAssets.flutterIcon, label: 'Flutter', height: 50),
                  _SkillIcon(assetPath: AppAssets.firebaseIcon, label: 'Firebase', height: 46),
                  _SkillIcon(assetPath: AppAssets.androidStudioIcon, label: 'Android', height: 46),
                  _SkillIcon(assetPath: AppAssets.sqlIcon, label: 'SQL', height: 46),
                  _SkillIcon(assetPath: AppAssets.apiIcon, label: 'REST APIs', height: 48),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class _SkillIcon extends StatelessWidget {
  const _SkillIcon({
    required this.assetPath,
    required this.label,
    required this.height,
  });

  final String assetPath;
  final String label;
  final double height;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: label,
      child: Container(
        padding: const EdgeInsets.all(10),
        decoration: BoxDecoration(
          color: Colors.white.withValues(alpha: 0.05),
          borderRadius: BorderRadius.circular(12),
          border: Border.all(color: Colors.white.withValues(alpha: 0.1)),
        ),
        child: Image.asset(
          assetPath,
          height: height,
          fit: BoxFit.contain,
        ),
      ),
    );
  }
}
