import 'package:flutter/foundation.dart';
import 'package:url_launcher/url_launcher.dart';

class UrlHelper {
  const UrlHelper._();

  static Future<bool> launch(String urlString) async {
    if (urlString.trim().isEmpty) return false;

    try {
      final uri = Uri.parse(urlString.trim());
      if (await canLaunchUrl(uri)) {
        return await launchUrl(uri, mode: LaunchMode.platformDefault);
      } else {
        debugPrint('UrlHelper: Could not launch URL: $urlString');
        return false;
      }
    } catch (e) {
      debugPrint('UrlHelper error: $e');
      return false;
    }
  }
}
