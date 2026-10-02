import 'package:material_ui/material_ui.dart';
import 'package:portfolio/core/theme/app_colors.dart';
import 'package:portfolio/core/utils/responsive.dart';
import 'package:portfolio/features/contact/widgets/contact_dialog.dart';

class HomeView extends StatelessWidget {
  const HomeView({super.key});

  @override
  Widget build(BuildContext context) {
    final isMobile = context.isMobile;

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 1000),
        child: Padding(
          padding: EdgeInsets.symmetric(
            horizontal: isMobile ? 24 : 48,
            vertical: 20,
          ),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Hi! I am,',
                style: TextStyle(
                  fontSize: isMobile ? 20 : 28,
                  color: AppColors.textSecondary,
                  fontWeight: FontWeight.w400,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Aadil Khan',
                style: TextStyle(
                  fontSize: isMobile ? 48 : 72,
                  fontWeight: FontWeight.w900,
                  color: AppColors.textPrimary,
                  letterSpacing: -1.0,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'I Build Cross Platform Applications',
                style: TextStyle(
                  fontSize: isMobile ? 32 : 54,
                  fontWeight: FontWeight.w800,
                  color: AppColors.textMuted,
                  height: 1.15,
                ),
              ),
              const SizedBox(height: 24),
              Text(
                'Software developer passionate about exploring new technologies in the modern tech ecosystem.',
                style: TextStyle(
                  fontSize: isMobile ? 14 : 16,
                  color: AppColors.textSecondary,
                  height: 1.5,
                ),
              ),
              const SizedBox(height: 36),
              ElevatedButton(
                onPressed: () => ContactDialog.show(context),
                child: const Text('Get In Touch'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
