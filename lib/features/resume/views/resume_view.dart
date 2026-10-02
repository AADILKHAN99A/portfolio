import 'package:cached_network_image/cached_network_image.dart';
import 'package:material_ui/material_ui.dart';
import 'package:portfolio/core/constants/app_assets.dart';
import 'package:portfolio/core/utils/responsive.dart';
import 'package:portfolio/core/utils/url_helper.dart';
import 'package:portfolio/features/portfolio/view_models/portfolio_view_model.dart';
import 'package:provider/provider.dart';

class ResumeView extends StatelessWidget {
  const ResumeView({super.key});

  @override
  Widget build(BuildContext context) {
    final portfolioVM = context.watch<PortfolioViewModel>();
    final isMobile = context.isMobile;
    final resumeImage = portfolioVM.resumeImageLink;
    final resumeUrl = portfolioVM.resumeLink;

    return Center(
      child: SingleChildScrollView(
        padding: EdgeInsets.symmetric(
          horizontal: isMobile ? 16 : 48,
          vertical: 24,
        ),
        child: ConstrainedBox(
          constraints: const BoxConstraints(maxWidth: 750),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: resumeImage.isNotEmpty
                    ? CachedNetworkImage(
                        imageUrl: resumeImage,
                        fit: BoxFit.contain,
                        placeholder: (_, __) => const Center(
                          child: Padding(
                            padding: EdgeInsets.all(40.0),
                            child: CircularProgressIndicator(),
                          ),
                        ),
                        errorWidget: (_, __, ___) => Image.asset(
                          AppAssets.resumeFallback,
                          fit: BoxFit.contain,
                        ),
                      )
                    : Image.asset(
                        AppAssets.resumeFallback,
                        fit: BoxFit.contain,
                      ),
              ),
              const SizedBox(height: 28),
              ElevatedButton.icon(
                onPressed: () {
                  if (resumeUrl.isNotEmpty) {
                    UrlHelper.launch(resumeUrl);
                  } else {
                    ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(
                        content: Text('Resume link is not configured yet.'),
                        behavior: SnackBarBehavior.floating,
                      ),
                    );
                  }
                },
                icon: const Icon(Icons.download),
                label: const Text('Download Resume'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
