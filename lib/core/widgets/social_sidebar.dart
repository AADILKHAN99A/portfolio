import 'package:material_ui/material_ui.dart';
import 'package:portfolio/core/constants/app_assets.dart';
import 'package:portfolio/core/constants/app_constants.dart';
import 'package:portfolio/core/utils/url_helper.dart';

class SocialSidebar extends StatelessWidget {
  const SocialSidebar({super.key});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.end,
      children: [
        _SocialIconButton(
          assetPath: AppAssets.githubIcon,
          url: AppConstants.githubUrl,
          tooltip: 'GitHub',
        ),
        _SocialIconButton(
          assetPath: AppAssets.linkedinIcon,
          url: AppConstants.linkedinUrl,
          tooltip: 'LinkedIn',
        ),
        _SocialIconButton(
          assetPath: AppAssets.skypeIcon,
          url: AppConstants.skypeUrl,
          tooltip: 'Skype',
        ),
        const SizedBox(height: 20),
      ],
    );
  }
}

class _SocialIconButton extends StatelessWidget {
  const _SocialIconButton({
    required this.assetPath,
    required this.url,
    required this.tooltip,
  });

  final String assetPath;
  final String url;
  final String tooltip;

  @override
  Widget build(BuildContext context) {
    return IconButton(
      tooltip: tooltip,
      onPressed: () => UrlHelper.launch(url),
      icon: Image.asset(
        assetPath,
        width: 32,
        height: 32,
        fit: BoxFit.contain,
      ),
    );
  }
}
