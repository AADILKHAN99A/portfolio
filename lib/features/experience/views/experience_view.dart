import 'package:cached_network_image/cached_network_image.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:material_ui/material_ui.dart';
import 'package:portfolio/core/constants/app_assets.dart';
import 'package:portfolio/core/theme/app_colors.dart';
import 'package:portfolio/core/utils/responsive.dart';
import 'package:portfolio/core/utils/url_helper.dart';
import 'package:portfolio/data/models/project_model.dart';
import 'package:portfolio/features/portfolio/view_models/portfolio_view_model.dart';
import 'package:provider/provider.dart';
import 'package:shimmer/shimmer.dart';

class ExperienceView extends StatelessWidget {
  const ExperienceView({super.key});

  @override
  Widget build(BuildContext context) {
    final portfolioVM = context.watch<PortfolioViewModel>();
    final isMobile = context.isMobile;

    if (portfolioVM.isLoading) {
      return const Center(child: CircularProgressIndicator());
    }

    final projects = portfolioVM.projects;
    if (projects.isEmpty) {
      return const Center(
        child: Text(
          'No projects loaded yet.',
          style: TextStyle(color: Colors.white70),
        ),
      );
    }

    return Center(
      child: ConstrainedBox(
        constraints: const BoxConstraints(maxWidth: 1100),
        child: ListView.separated(
          padding: EdgeInsets.symmetric(
            horizontal: isMobile ? 16 : 40,
            vertical: 40,
          ),
          itemCount: projects.length,
          separatorBuilder: (_, __) => const SizedBox(height: 60),
          itemBuilder: (context, index) {
            final project = projects[index];
            return isMobile
                ? _MobileProjectCard(project: project)
                : _DesktopProjectCard(project: project, index: index);
          },
        ),
      ),
    );
  }
}

class _MobileProjectCard extends StatelessWidget {
  const _MobileProjectCard({required this.project});

  final Project project;

  @override
  Widget build(BuildContext context) {
    final images = project.responsiveImages;

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        if (images.isNotEmpty)
          CarouselSlider(
            items: images.map((image) {
              return ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: CachedNetworkImage(
                  imageUrl: image,
                  fit: BoxFit.cover,
                  width: double.infinity,
                  placeholder: (_, __) => Shimmer.fromColors(
                    baseColor: Colors.white10,
                    highlightColor: Colors.white24,
                    child: Container(color: Colors.white10),
                  ),
                  errorWidget: (_, __, ___) => Image.asset(AppAssets.imageLoading),
                ),
              );
            }).toList(),
            options: CarouselOptions(
              height: 280,
              autoPlay: images.length > 1,
              enlargeCenterPage: true,
              viewportFraction: 0.9,
            ),
          ),
        const SizedBox(height: 16),
        Text(
          project.name,
          style: const TextStyle(fontSize: 24, fontWeight: FontWeight.w900),
        ),
        const SizedBox(height: 10),
        Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: AppColors.surfaceDark,
            borderRadius: BorderRadius.circular(8),
          ),
          child: Text(
            project.description,
            style: const TextStyle(color: AppColors.textSecondary, height: 1.4),
          ),
        ),
        const SizedBox(height: 12),
        Text(
          project.technology,
          style: const TextStyle(fontSize: 13, color: AppColors.accentGreen),
        ),
        if (project.github.isNotEmpty) ...[
          const SizedBox(height: 8),
          IconButton(
            onPressed: () => UrlHelper.launch(project.github),
            icon: Image.asset(AppAssets.githubIcon, width: 32, height: 32),
            tooltip: 'View Source',
          ),
        ],
      ],
    );
  }
}

class _DesktopProjectCard extends StatelessWidget {
  const _DesktopProjectCard({required this.project, required this.index});

  final Project project;
  final int index;

  @override
  Widget build(BuildContext context) {
    final isLeft = project.direction == 'left';
    final images = project.responsiveImages;

    final imageWidget = Expanded(
      flex: 5,
      child: ClipRRect(
        borderRadius: BorderRadius.circular(12),
        child: images.isNotEmpty
            ? CachedNetworkImage(
                imageUrl: images.last,
                fit: BoxFit.cover,
                height: 320,
                placeholder: (_, __) => Shimmer.fromColors(
                  baseColor: Colors.white10,
                  highlightColor: Colors.white24,
                  child: Container(height: 320, color: Colors.white10),
                ),
                errorWidget: (_, __, ___) => Image.asset(AppAssets.imageLoading),
              )
            : Image.asset(AppAssets.imageLoading, height: 320),
      ),
    );

    final infoWidget = Expanded(
      flex: 4,
      child: Column(
        crossAxisAlignment:
            isLeft ? CrossAxisAlignment.start : CrossAxisAlignment.end,
        children: [
          Text(
            project.name,
            style: const TextStyle(fontSize: 28, fontWeight: FontWeight.w900),
          ),
          const SizedBox(height: 16),
          Container(
            padding: const EdgeInsets.all(20),
            decoration: BoxDecoration(
              color: AppColors.surfaceDark,
              borderRadius: BorderRadius.circular(8),
              boxShadow: [
                BoxShadow(
                  color: Colors.black.withValues(alpha: 0.3),
                  blurRadius: 10,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: Text(
              project.description,
              textAlign: isLeft ? TextAlign.left : TextAlign.right,
              style: const TextStyle(
                color: AppColors.textSecondary,
                fontSize: 15,
                height: 1.5,
              ),
            ),
          ),
          const SizedBox(height: 14),
          Text(
            project.technology,
            style: const TextStyle(fontSize: 13, color: AppColors.accentGreen),
          ),
          if (project.github.isNotEmpty) ...[
            const SizedBox(height: 10),
            IconButton(
              onPressed: () => UrlHelper.launch(project.github),
              icon: Image.asset(AppAssets.githubIcon, width: 32, height: 32),
              tooltip: 'View on GitHub',
            ),
          ],
        ],
      ),
    );

    return Row(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: isLeft
          ? [imageWidget, const SizedBox(width: 40), infoWidget]
          : [infoWidget, const SizedBox(width: 40), imageWidget],
    );
  }
}
