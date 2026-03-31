import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SiteSettings } from '../schemas/settings.schema';
import { UpdateSettingsDto } from '../dtos/settings.dto';
import {
  FooterSettings,
  FooterSettingsDocument,
} from '../schemas/footer-settings.schema';
import {
  PrivacyPolicy,
  PrivacyPolicyDocument,
} from '../schemas/privacy-policy.schema';
import { AboutPage, AboutPageDocument } from '../schemas/about-page.schema';
import {
  TermsConditions,
  TermsConditionsDocument,
} from '../schemas/terms-conditions.schema';
import { UpdateFooterSettingsDto } from '../dtos/update-footer-settings.dto';
import { UpdatePrivacyPolicyDto } from '../dtos/update-privacy-policy.dto';
import { UpdateAboutPageDto } from '../dtos/update-about-page.dto';
import { UpdateTermsConditionsDto } from '../dtos/update-terms-conditions.dto';

const DEFAULT_ABOUT_SECTIONS = [
  {
    text: 'GalaKids — ეს არის საბავშვო ტანსაცმლის ბრენდი, რომელიც შეიქმნა სიყვარულით, ზრუნვით და იმ რწმენით, რომ ბავშვობა თავისუფლებას, ფერებს და კომფორტს ნიშნავს.',
    textEn:
      'GalaKids is a children\'s clothing brand created with love, care, and the belief that childhood means freedom, colors, and comfort.',
    type: 'normal',
  },
  {
    text: 'ჩვენ ვქმნით ტანსაცმელს, რომელიც ბავშვებს საშუალებას აძლევს იყვნენ თავისუფლები — ითამაშონ, აღმოაჩინონ, იოცნებონ და გაიზარდონ კომფორტულ, ლამაზ და ხარისხიან სამოსში.',
    textEn:
      'We create clothing that lets kids be free — to play, discover, dream, and grow in comfortable, beautiful, and quality garments.',
    type: 'normal',
  },
  {
    text: 'ყოველი ნაჭერი, ყოველი ფერი, ყოველი დეტალი — შერჩეულია იმისთვის, რომ ბავშვმა თავი განსაკუთრებულად იგრძნოს',
    textEn:
      'Every fabric, every color, every detail — is chosen to make a child feel special',
    type: 'highlight',
  },
  {
    text: 'ჩვენი მისიაა, რომ ყოველი პაწაწინა მომხმარებელი იყოს ბედნიერი, კომფორტული და სტილური.',
    textEn:
      'Our mission is to make every little customer happy, comfortable, and stylish.',
    type: 'normal',
  },
  {
    text: 'GalaKids — იმიტომ, რომ ბავშვები საუკეთესოს იმსახურებენ!',
    textEn: 'GalaKids — because kids deserve the best!',
    type: 'quote',
  },
  {
    text: 'თუ გიყვარს ხარისხი, კომფორტი და სტილი შენი პატარასთვის — GalaKids სწორედ შენთვისაა.',
    textEn:
      'If you love quality, comfort, and style for your little one — GalaKids is made for you.',
    type: 'final',
  },
];

const DEFAULT_PRIVACY_SECTIONS = [
  {
    title: 'ინფორმაციის შეგროვება',
    titleEn: 'Information Collection',
    content:
      'თქვენგან ვაგროვებთ იმ ინფორმაციას, რომელსაც პირდაპირ გვაწვდით — მაგალითად, როცა ქმნით ანგარიშს, ასრულებთ შეძენას ან გვიკავშირდებით. ეს შეიძლება მოიცავდეს თქვენს სახელს, ელფოსტის მისამართს, ტელეფონის ნომერს, მიწოდების მისამართს და გადახდის ინფორმაციას.',
    contentEn:
      'We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us. This includes your name, email address, phone number, shipping address, and payment information.',
    type: 'paragraph',
  },
  {
    title: 'როგორ ვიყენებთ თქვენს ინფორმაციას',
    titleEn: 'How We Use Your Information',
    content:
      'თქვენი შეკვეთების დამუშავება და შესრულება\nშეკვეთის დადასტურების და მიწოდების განახლებების გაგზავნა\nმომხმარებლის მხარდაჭერის უზრუნველყოფა\nჩვენი ვებსაიტის და სერვისების გაუმჯობესება\nსარეკლამო ელფოსტების გაგზავნა (თქვენი თანხმობით)',
    contentEn:
      'Process and fulfill your orders\nSend you order confirmations and shipping updates\nProvide customer support\nImprove our website and services\nSend promotional emails (with your consent)',
    type: 'list',
  },
  {
    title: 'ინფორმაციის გაზიარება',
    titleEn: 'Information Sharing',
    content:
      'ჩვენ არ ვყიდით, არ ვცვლით და არ ვაქირავებთ თქვენს პირად ინფორმაციას მესამე მხარეებისთვის. შეიძლება გავაზიაროთ თქვენი ინფორმაცია სანდო სერვის პროვაიდერებთან, რომლებიც გვეხმარებიან ჩვენი ბიზნესის მართვაში.',
    contentEn:
      'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who help us operate our business.',
    type: 'paragraph',
  },
  {
    title: 'მონაცემთა უსაფრთხოება',
    titleEn: 'Data Security',
    content:
      'ჩვენ ვახორციელებთ შესაბამის უსაფრთხოების ზომებს თქვენი პირადი ინფორმაციის დასაცავად უნებართვო წვდომისგან, შეცვლისგან, გამჟღავნებისგან ან განადგურებისგან.',
    contentEn:
      'We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
    type: 'paragraph',
  },
  {
    title: 'ქუქიები',
    titleEn: 'Cookies',
    content:
      'ჩვენი ვებსაიტი იყენებს ქუქიებს თქვენი დათვალიერების გამოცდილების გასაუმჯობესებლად, თქვენი პრეფერენსების დასამახსოვრებლად და ვებსაიტის ტრაფიკის გასაანალიზებლად.',
    contentEn:
      'Our website uses cookies to enhance your browsing experience, remember your preferences, and analyze website traffic.',
    type: 'paragraph',
  },
  {
    title: 'თქვენი უფლებები',
    titleEn: 'Your Rights',
    content:
      'გაქვთ უფლება, იხილოთ, განაახლოთ ან წაშალოთ თქვენი პირადი ინფორმაცია. ასევე შეგიძლიათ ნებისმიერ დროს გააუქმოთ სარეკლამო ელფოსტების მიღება.',
    contentEn:
      'You have the right to access, update, or delete your personal information. You can also unsubscribe from promotional emails at any time.',
    type: 'paragraph',
  },
  {
    title: 'საკონტაქტო ინფორმაცია',
    titleEn: 'Contact Information',
    content:
      'თუ გაქვთ რაიმე კითხვა ამ კონფიდენციალურობის პოლიტიკასთან დაკავშირებით, გთხოვთ დაგვიკავშირდეთ:\nEmail: info@galakids.ge\nმისამართი: თბილისი, საქართველო',
    contentEn:
      'If you have any questions about this Privacy Policy, please contact us at:\nEmail: info@galakids.ge\nAddress: Tbilisi, Georgia',
    type: 'paragraph',
  },
  {
    title: 'ცვლილებები ამ პოლიტიკაში',
    titleEn: 'Changes to This Policy',
    content:
      'ჩვენ შეიძლება პერიოდულად განვაახლოთ კონფიდენციალურობის პოლიტიკა. ჩვენ შეგატყობინებთ ნებისმიერი ცვლილების შესახებ ამ გვერდზე ახალი კონფიდენციალურობის პოლიტიკის გამოქვეყნებით.',
    contentEn:
      'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.',
    type: 'paragraph',
  },
];

const DEFAULT_TERMS_SECTIONS = [
  {
    title: 'ზოგადი პირობები',
    titleEn: 'General Terms',
    content:
      'ვებგვერდით სარგებლობით თქვენ ეთანხმებით ამ წესებსა და პირობებს. გთხოვთ, ყურადღებით წაიკითხოთ მათ გამოყენებამდე.',
    contentEn:
      'By using this website, you agree to these Terms and Conditions. Please read them carefully before use.',
    type: 'paragraph',
  },
  {
    title: 'შეკვეთა და გადახდა',
    titleEn: 'Orders and Payment',
    content:
      'შეკვეთის გაფორმებისას თქვენ ადასტურებთ, რომ მოწოდებული ინფორმაცია სწორია.\nგადახდა ხორციელდება ონლაინ საბანკო ბარათით.\nშეკვეთა დადასტურებულად ითვლება გადახდის წარმატებით შესრულების შემდეგ.\nჩვენ ვიტოვებთ უფლებას უარი ვთქვათ ნებისმიერ შეკვეთაზე.',
    contentEn:
      'By placing an order, you confirm that the information provided is correct.\nPayment is made online via bank card.\nAn order is considered confirmed after successful payment.\nWe reserve the right to refuse any order.',
    type: 'list',
  },
  {
    title: 'მიწოდება',
    titleEn: 'Delivery',
    content:
      'მიწოდება ხორციელდება საქართველოს მასშტაბით. მიწოდების ვადა დამოკიდებულია თქვენს მდებარეობაზე და შეიძლება იყოს 1-5 სამუშაო დღე.',
    contentEn:
      'Delivery is available throughout Georgia. Delivery time depends on your location and may take 1-5 business days.',
    type: 'paragraph',
  },
  {
    title: 'დაბრუნება და გაცვლა',
    titleEn: 'Returns and Exchanges',
    content:
      'პროდუქტის დაბრუნება ან გაცვლა შესაძლებელია მიღებიდან 14 დღის განმავლობაში.\nპროდუქტი უნდა იყოს ორიგინალ შეფუთვაში, გამოუყენებელი და დაუზიანებელი.\nდაბრუნებისთვის გთხოვთ დაგვიკავშირდეთ ელ-ფოსტაზე ან ტელეფონით.\nფასდაკლებით შეძენილი პროდუქტები არ ექვემდებარება დაბრუნებას.',
    contentEn:
      'Products can be returned or exchanged within 14 days of receipt.\nThe product must be in its original packaging, unused, and undamaged.\nFor returns, please contact us via email or phone.\nDiscounted products are not eligible for returns.',
    type: 'list',
  },
  {
    title: 'ინტელექტუალური საკუთრება',
    titleEn: 'Intellectual Property',
    content:
      'ვებგვერდზე განთავსებული ყველა შინაარსი, მათ შორის ტექსტები, სურათები, ლოგოები, დიზაინი და პროგრამული უზრუნველყოფა, წარმოადგენს ჩვენს ინტელექტუალურ საკუთრებას.',
    contentEn:
      'All content on this website, including text, images, logos, designs, and software, is our intellectual property and is protected by copyright law.',
    type: 'paragraph',
  },
  {
    title: 'პასუხისმგებლობის შეზღუდვა',
    titleEn: 'Limitation of Liability',
    content:
      'ჩვენ არ ვიღებთ პასუხისმგებლობას ნებისმიერ ზიანზე, რომელიც შეიძლება წარმოიშვას ვებგვერდის გამოყენების შედეგად.',
    contentEn:
      'We are not liable for any damages that may arise from the use of this website.',
    type: 'paragraph',
  },
  {
    title: 'ცვლილებები პირობებში',
    titleEn: 'Changes to Terms',
    content:
      'ჩვენ ვიტოვებთ უფლებას ნებისმიერ დროს შევცვალოთ ეს წესები და პირობები. ცვლილებები ძალაში შედის ვებგვერდზე გამოქვეყნებისთანავე.',
    contentEn:
      'We reserve the right to modify these Terms and Conditions at any time. Changes take effect immediately upon publication on the website.',
    type: 'paragraph',
  },
  {
    title: 'საკონტაქტო ინფორმაცია',
    titleEn: 'Contact Information',
    content:
      'თუ გაქვთ კითხვები ამ წესებთან და პირობებთან დაკავშირებით, გთხოვთ დაგვიკავშირდეთ:\nEmail: info@galakids.ge\nმისამართი: თბილისი, საქართველო',
    contentEn:
      'If you have any questions about these Terms and Conditions, please contact us:\nEmail: info@galakids.ge\nAddress: Tbilisi, Georgia',
    type: 'paragraph',
  },
];

@Injectable()
export class SettingsService {
  constructor(
    @InjectModel(SiteSettings.name)
    private settingsModel: Model<SiteSettings>,
    @InjectModel(FooterSettings.name)
    private footerSettingsModel: Model<FooterSettingsDocument>,
    @InjectModel(PrivacyPolicy.name)
    private privacyPolicyModel: Model<PrivacyPolicyDocument>,
    @InjectModel(AboutPage.name)
    private aboutPageModel: Model<AboutPageDocument>,
    @InjectModel(TermsConditions.name)
    private termsConditionsModel: Model<TermsConditionsDocument>,
  ) {}

  // ---- Messenger Link (existing) ----

  async getSettings(): Promise<SiteSettings> {
    let settings = await this.settingsModel.findOne({ key: 'main' });
    if (!settings) {
      settings = await this.settingsModel.create({ key: 'main' });
    }
    return settings;
  }

  async updateSettings(dto: UpdateSettingsDto): Promise<SiteSettings> {
    const settings = await this.settingsModel.findOneAndUpdate(
      { key: 'main' },
      { $set: dto },
      { new: true, upsert: true },
    );
    return settings;
  }

  // ---- Footer Settings ----

  async getFooterSettings(): Promise<FooterSettingsDocument> {
    let settings = await this.footerSettingsModel.findOne();
    if (!settings) {
      settings = await this.footerSettingsModel.create({});
    }
    return settings;
  }

  async updateFooterSettings(
    dto: UpdateFooterSettingsDto,
  ): Promise<FooterSettingsDocument> {
    let settings = await this.footerSettingsModel.findOne();
    if (!settings) {
      settings = await this.footerSettingsModel.create(dto);
    } else {
      Object.assign(settings, dto);
      await settings.save();
    }
    return settings;
  }

  // ---- Privacy Policy ----

  async getPrivacyPolicy(): Promise<PrivacyPolicyDocument> {
    let policy = await this.privacyPolicyModel.findOne();
    if (!policy) {
      policy = await this.privacyPolicyModel.create({
        sections: DEFAULT_PRIVACY_SECTIONS,
      });
    }
    return policy;
  }

  async updatePrivacyPolicy(
    dto: UpdatePrivacyPolicyDto,
  ): Promise<PrivacyPolicyDocument> {
    let policy = await this.privacyPolicyModel.findOne();
    if (!policy) {
      policy = await this.privacyPolicyModel.create(dto);
    } else {
      Object.assign(policy, dto);
      await policy.save();
    }
    return policy;
  }

  // ---- About Page ----

  async getAboutPage(): Promise<AboutPageDocument> {
    let about = await this.aboutPageModel.findOne();
    if (!about) {
      about = await this.aboutPageModel.create({
        sections: DEFAULT_ABOUT_SECTIONS,
      });
    }
    return about;
  }

  async updateAboutPage(dto: UpdateAboutPageDto): Promise<AboutPageDocument> {
    let about = await this.aboutPageModel.findOne();
    if (!about) {
      about = await this.aboutPageModel.create(dto);
    } else {
      Object.assign(about, dto);
      await about.save();
    }
    return about;
  }

  // ---- Terms & Conditions ----

  async getTermsConditions(): Promise<TermsConditionsDocument> {
    let terms = await this.termsConditionsModel.findOne();
    if (!terms) {
      terms = await this.termsConditionsModel.create({
        sections: DEFAULT_TERMS_SECTIONS,
      });
    }
    return terms;
  }

  async updateTermsConditions(
    dto: UpdateTermsConditionsDto,
  ): Promise<TermsConditionsDocument> {
    let terms = await this.termsConditionsModel.findOne();
    if (!terms) {
      terms = await this.termsConditionsModel.create(dto);
    } else {
      Object.assign(terms, dto);
      await terms.save();
    }
    return terms;
  }
}
