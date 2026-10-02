import 'package:material_ui/material_ui.dart';
import 'package:portfolio/core/theme/app_colors.dart';
import 'package:portfolio/core/utils/responsive.dart';
import 'package:portfolio/core/widgets/adaptive_nav_bar.dart';
import 'package:portfolio/core/widgets/social_sidebar.dart';
import 'package:portfolio/features/about/views/about_view.dart';
import 'package:portfolio/features/contact/views/contact_view.dart';
import 'package:portfolio/features/experience/views/experience_view.dart';
import 'package:portfolio/features/home/views/home_view.dart';
import 'package:portfolio/features/resume/views/resume_view.dart';
import 'package:portfolio/features/shell/view_models/shell_view_model.dart';
import 'package:provider/provider.dart';

class MainShellView extends StatelessWidget {
  const MainShellView({super.key});

  static const List<Widget> _pages = [
    HomeView(),
    AboutView(),
    ExperienceView(),
    ContactView(),
    ResumeView(),
  ];

  @override
  Widget build(BuildContext context) {
    final shellVM = context.watch<ShellViewModel>();
    final isMobile = context.isMobile;
    final bgImage = AppColors.getBackgroundImage(shellVM.currentIndex);

    return Scaffold(
      extendBodyBehindAppBar: true,
      appBar: const AdaptiveNavBar(),
      body: AnimatedContainer(
        duration: const Duration(milliseconds: 600),
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(bgImage),
            fit: BoxFit.cover,
          ),
        ),
        child: SafeArea(
          child: Row(
            children: [
              if (!isMobile) ...[
                const Padding(
                  padding: EdgeInsets.only(left: 16),
                  child: SocialSidebar(),
                ),
              ],
              Expanded(
                child: PageView(
                  controller: shellVM.pageController,
                  onPageChanged: shellVM.onPageChanged,
                  children: _pages,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
