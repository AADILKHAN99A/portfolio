import 'package:material_ui/material_ui.dart';
import 'package:portfolio/core/theme/app_colors.dart';
import 'package:portfolio/core/utils/responsive.dart';
import 'package:portfolio/features/shell/view_models/shell_view_model.dart';
import 'package:provider/provider.dart';

class AdaptiveNavBar extends StatelessWidget implements PreferredSizeWidget {
  const AdaptiveNavBar({super.key});

  @override
  Size get preferredSize => const Size.fromHeight(kToolbarHeight + 10);

  @override
  Widget build(BuildContext context) {
    final shellVM = context.watch<ShellViewModel>();
    final currentIndex = shellVM.currentIndex;
    final isMobile = context.isMobile;

    return AppBar(
      backgroundColor: currentIndex == 4
          ? AppColors.appBarResumeBg
          : AppColors.transparent,
      elevation: 0,
      scrolledUnderElevation: 0,
      centerTitle: false,
      actions: [
        _NavItem(
          label: 'Home',
          isSelected: currentIndex == 0,
          onTap: () => shellVM.animateToPage(0),
          isMobile: isMobile,
        ),
        _NavItem(
          label: 'About',
          isSelected: currentIndex == 1,
          onTap: () => shellVM.animateToPage(1),
          isMobile: isMobile,
        ),
        _NavItem(
          label: 'Experience',
          isSelected: currentIndex == 2,
          onTap: () => shellVM.animateToPage(2),
          isMobile: isMobile,
        ),
        _NavItem(
          label: 'Contact',
          isSelected: currentIndex == 3,
          onTap: () => shellVM.animateToPage(3),
          isMobile: isMobile,
        ),
        Padding(
          padding: EdgeInsets.symmetric(
            horizontal: isMobile ? 8 : 20,
            vertical: 8,
          ),
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: AppColors.getButtonColor(currentIndex),
              foregroundColor: currentIndex == 4 ? Colors.black : Colors.white,
              padding: EdgeInsets.symmetric(
                horizontal: isMobile ? 12 : 20,
                vertical: isMobile ? 8 : 12,
              ),
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(6),
              ),
              side: BorderSide(
                color: currentIndex == 4 ? Colors.transparent : Colors.white,
              ),
            ),
            onPressed: () => shellVM.animateToPage(4),
            child: Text(
              'Resume',
              style: TextStyle(
                fontWeight: FontWeight.bold,
                fontSize: isMobile ? 12 : 14,
                color: currentIndex == 4 ? Colors.black : Colors.white,
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _NavItem extends StatelessWidget {
  const _NavItem({
    required this.label,
    required this.isSelected,
    required this.onTap,
    required this.isMobile,
  });

  final String label;
  final bool isSelected;
  final VoidCallback onTap;
  final bool isMobile;

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.symmetric(horizontal: isMobile ? 4 : 10),
      child: TextButton(
        onPressed: onTap,
        style: TextButton.styleFrom(
          padding: EdgeInsets.symmetric(
            horizontal: isMobile ? 6 : 14,
            vertical: 8,
          ),
        ),
        child: Text(
          label,
          style: TextStyle(
            color: isSelected ? AppColors.accentGreen : Colors.white,
            fontSize: isMobile ? 13 : 15,
            fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
          ),
        ),
      ),
    );
  }
}
