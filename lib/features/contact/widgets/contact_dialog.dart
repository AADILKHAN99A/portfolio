import 'dart:ui';
import 'package:material_ui/material_ui.dart';
import 'package:flutter/services.dart';
import 'package:portfolio/core/constants/app_constants.dart';
import 'package:portfolio/core/utils/responsive.dart';
import 'package:portfolio/data/repositories/contact_repository.dart';
import 'package:portfolio/features/contact/view_models/contact_view_model.dart';
import 'package:provider/provider.dart';

class ContactDialog extends StatelessWidget {
  const ContactDialog({super.key});

  static Future<void> show(BuildContext context) {
    return showDialog<void>(
      context: context,
      barrierDismissible: true,
      builder: (_) => ChangeNotifierProvider(
        create: (ctx) => ContactViewModel(
          repository: ctx.read<ContactRepository>(),
        ),
        child: const ContactDialog(),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final isMobile = context.isMobile;

    return Center(
      child: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: ConstrainedBox(
          constraints: BoxConstraints(
            maxWidth: isMobile ? 400 : 800,
          ),
          child: ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: BackdropFilter(
              filter: ImageFilter.blur(sigmaX: 25, sigmaY: 25),
              child: Container(
                padding: EdgeInsets.all(isMobile ? 24 : 36),
                decoration: BoxDecoration(
                  color: Colors.black.withValues(alpha: 0.75),
                  borderRadius: BorderRadius.circular(20),
                  border: Border.all(
                    color: Colors.white.withValues(alpha: 0.15),
                  ),
                ),
                child: Material(
                  color: Colors.transparent,
                  child: isMobile
                      ? const Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            _ContactInfoSection(),
                            SizedBox(height: 24),
                            Divider(color: Colors.white24),
                            SizedBox(height: 16),
                            _ContactFormSection(),
                          ],
                        )
                      : const Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(flex: 4, child: _ContactInfoSection()),
                            SizedBox(width: 32),
                            VerticalDivider(color: Colors.white24),
                            SizedBox(width: 32),
                            Expanded(flex: 5, child: _ContactFormSection()),
                          ],
                        ),
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}

class _ContactInfoSection extends StatelessWidget {
  const _ContactInfoSection();

  void _copyToClipboard(BuildContext context, String text, String label) {
    Clipboard.setData(ClipboardData(text: text));
    ScaffoldMessenger.of(context).showSnackBar(
      SnackBar(
        content: Text('$label copied to clipboard!'),
        behavior: SnackBarBehavior.floating,
        duration: const Duration(seconds: 2),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisSize: MainAxisSize.min,
      children: [
        const Text(
          'Get in Touch',
          style: TextStyle(
            fontSize: 26,
            fontWeight: FontWeight.bold,
            color: Colors.white,
          ),
        ),
        const SizedBox(height: 12),
        const Text(
          'Have a project in mind or want to collaborate? Feel free to reach out directly.',
          style: TextStyle(color: Colors.white70, fontSize: 14),
        ),
        const SizedBox(height: 28),
        _InfoTile(
          icon: Icons.location_on_outlined,
          title: 'Location',
          value: AppConstants.contactLocation,
        ),
        const SizedBox(height: 16),
        _InfoTile(
          icon: Icons.phone_outlined,
          title: 'Phone',
          value: AppConstants.contactPhone,
          onTap: () => _copyToClipboard(
            context,
            AppConstants.contactPhone,
            'Phone number',
          ),
        ),
        const SizedBox(height: 16),
        _InfoTile(
          icon: Icons.email_outlined,
          title: 'Email',
          value: AppConstants.contactEmail,
          onTap: () => _copyToClipboard(
            context,
            AppConstants.contactEmail,
            'Email address',
          ),
        ),
      ],
    );
  }
}

class _InfoTile extends StatelessWidget {
  const _InfoTile({
    required this.icon,
    required this.title,
    required this.value,
    this.onTap,
  });

  final IconData icon;
  final String title;
  final String value;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(8),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 4, horizontal: 6),
        child: Row(
          children: [
            Icon(icon, color: Colors.white70, size: 20),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: const TextStyle(fontSize: 11, color: Colors.white38),
                  ),
                  Text(
                    value,
                    style: const TextStyle(fontSize: 14, color: Colors.white),
                  ),
                ],
              ),
            ),
            if (onTap != null)
              const Icon(Icons.copy, size: 14, color: Colors.white38),
          ],
        ),
      ),
    );
  }
}

class _ContactFormSection extends StatelessWidget {
  const _ContactFormSection();

  @override
  Widget build(BuildContext context) {
    final contactVM = context.watch<ContactViewModel>();

    return Form(
      key: contactVM.formKey,
      child: Column(
        mainAxisSize: MainAxisSize.min,
        children: [
          TextFormField(
            controller: contactVM.nameController,
            decoration: const InputDecoration(labelText: 'Your Name'),
            validator: (v) =>
                (v == null || v.trim().isEmpty) ? 'Please enter your name' : null,
          ),
          const SizedBox(height: 14),
          TextFormField(
            controller: contactVM.emailController,
            keyboardType: TextInputType.emailAddress,
            decoration: const InputDecoration(labelText: 'Your Email'),
            validator: (v) {
              if (v == null || v.trim().isEmpty) return 'Please enter your email';
              if (!v.contains('@')) return 'Enter a valid email address';
              return null;
            },
          ),
          const SizedBox(height: 14),
          TextFormField(
            controller: contactVM.subjectController,
            decoration: const InputDecoration(labelText: 'Subject'),
            validator: (v) =>
                (v == null || v.trim().isEmpty) ? 'Please enter a subject' : null,
          ),
          const SizedBox(height: 14),
          TextFormField(
            controller: contactVM.messageController,
            maxLines: 3,
            decoration: const InputDecoration(labelText: 'Message'),
            validator: (v) =>
                (v == null || v.trim().isEmpty) ? 'Please enter a message' : null,
          ),
          const SizedBox(height: 20),
          SizedBox(
            width: double.infinity,
            height: 44,
            child: ElevatedButton(
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.white,
                foregroundColor: Colors.black,
              ),
              onPressed: contactVM.isSubmitting
                  ? null
                  : () async {
                      final success = await context.read<ContactViewModel>().submit();
                      if (context.mounted) {
                        if (success) {
                          Navigator.of(context).pop();
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text('Message sent successfully!'),
                              backgroundColor: Colors.green,
                              behavior: SnackBarBehavior.floating,
                            ),
                          );
                        } else if (contactVM.errorMessage != null) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            SnackBar(
                              content: Text(contactVM.errorMessage!),
                              backgroundColor: Colors.redAccent,
                              behavior: SnackBarBehavior.floating,
                            ),
                          );
                        }
                      }
                    },
              child: contactVM.isSubmitting
                  ? const SizedBox(
                      width: 20,
                      height: 20,
                      child: CircularProgressIndicator(strokeWidth: 2),
                    )
                  : const Text(
                      'Send Message',
                      style: TextStyle(fontWeight: FontWeight.bold),
                    ),
            ),
          ),
        ],
      ),
    );
  }
}
