import 'package:material_ui/material_ui.dart';
import 'package:portfolio/core/theme/app_colors.dart';
import 'package:portfolio/core/utils/responsive.dart';
import 'package:portfolio/features/contact/widgets/contact_dialog.dart';

class ContactView extends StatelessWidget {
  const ContactView({super.key});

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
          constraints: const BoxConstraints(maxWidth: 700),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Text(
                "What's Next?",
                style: TextStyle(
                  fontSize: isMobile ? 32 : 44,
                  fontWeight: FontWeight.w800,
                  color: AppColors.accentGreen,
                ),
              ),
              const SizedBox(height: 12),
              Text(
                'Get In Touch',
                style: TextStyle(
                  fontSize: isMobile ? 24 : 32,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
              const SizedBox(height: 24),
              Text(
                "Your go-to Cross-Platform App Developer, ready to bring your dream project to life in the digital realm. From building modern apps for businesses to crafting custom tech products, I have the skills and expertise to make it happen.",
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: AppColors.textSecondary,
                  fontSize: isMobile ? 15 : 18,
                  height: 1.6,
                ),
              ),
              const SizedBox(height: 16),
              Text(
                "Let's build something awesome together!",
                textAlign: TextAlign.center,
                style: TextStyle(
                  color: Colors.white,
                  fontSize: isMobile ? 16 : 20,
                  fontWeight: FontWeight.w600,
                ),
              ),
              const SizedBox(height: 36),
              ElevatedButton(
                onPressed: () => ContactDialog.show(context),
                child: const Text('Send A Message'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
