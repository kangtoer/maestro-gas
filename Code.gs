/**
 * ==============================================================================
 * IPS MAESTRO - GOOGLE APPS SCRIPT (GAS) ENTERPRISE ENGINE
 * ==============================================================================
 * Aplikasi All-in-One Perangkat Pembelajaran & Administrasi Guru IPS SMP
 * Berbasis AI Kurikulum Merdeka & Standar Kemendikbudristek
 * 
 * Hak Cipta © 2026 Catur Pamungkas, S.Pd.,Gr.
 * Website Resmi    : https://toer.my.id
 * Saluran WhatsApp : https://whatsapp.com/channel/0029Vb6R2Ny2v1J1dll5Mq27
 * ==============================================================================
 */

var AUTHOR_NAME = "Catur Pamungkas, S.Pd.,Gr.";
var AUTHOR_WEB = "https://toer.my.id";
var WA_CHANNEL = "https://whatsapp.com/channel/0029Vb6R2Ny2v1J1dll5Mq27";
var WATERMARK_TEXT = "Disusun dengan IPS Maestro • Karya " + AUTHOR_NAME + " (" + AUTHOR_WEB + ") • Saluran WA: " + WA_CHANNEL;

/**
 * Endpoint Web App untuk melayani antarmuka pengguna
 */
function doGet(e) {
  var template = HtmlService.createTemplateFromFile('Index');
  var output = template.evaluate()
    .setTitle('IPS Maestro - Guru IPS SMP (Karya Catur Pamungkas, S.Pd.,Gr.)')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
  return output;
}

/**
 * Memanggil Gemini AI menggunakan UrlFetchApp bawaan Google Apps Script
 */
function callGeminiAI(prompt, systemInstruction, userApiKey) {
  try {
    var apiKey = userApiKey || PropertiesService.getUserProperties().getProperty('GEMINI_API_KEY') || PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    
    if (!apiKey || apiKey.trim() === '' || apiKey === 'SERVER_SAVED') {
      apiKey = PropertiesService.getUserProperties().getProperty('GEMINI_API_KEY') || PropertiesService.getScriptProperties().getProperty('GEMINI_API_KEY');
    }

    if (!apiKey || apiKey.trim() === '') {
      throw new Error("Kunci API Gemini belum diisi. Silakan klik tombol 'Kunci API' di pojok kanan atas untuk memasukkan Kunci API Gemini gratis Anda.");
    }

    // Mendukung endpoint Gemini AI
    var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + encodeURIComponent(apiKey.trim());

    var payload = {
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 8192,
        topP: 0.95
      }
    };

    if (systemInstruction && systemInstruction.trim() !== '') {
      payload.systemInstruction = {
        parts: [{ text: systemInstruction }]
      };
    }

    var options = {
      method: "post",
      contentType: "application/json",
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    var response = UrlFetchApp.fetch(url, options);
    var statusCode = response.getResponseCode();
    var responseJson = JSON.parse(response.getContentText());

    if (statusCode !== 200) {
      var errorMsg = (responseJson.error && responseJson.error.message) ? responseJson.error.message : "Gagal memanggil Gemini API (Kode: " + statusCode + ")";
      throw new Error(errorMsg);
    }

    if (responseJson.candidates && responseJson.candidates[0] && responseJson.candidates[0].content && responseJson.candidates[0].content.parts[0]) {
      return {
        success: true,
        text: responseJson.candidates[0].content.parts[0].text
      };
    } else {
      throw new Error("Respon AI tidak mengembalikan konten teks.");
    }
  } catch (err) {
    return {
      success: false,
      error: err.message || err.toString()
    };
  }
}

/**
 * Mengekspor dokumen langsung ke Google Docs di Google Drive pengguna
 */
function exportToGoogleDocs(title, markdownContent, subjectInfo, schoolProfile) {
  try {
    var cleanTitle = (title || "Dokumen IPS Maestro").replace(/[^\w\s\-\(\)\.]/gi, '_');
    var docTitle = cleanTitle + " - IPS Maestro";
    var doc = DocumentApp.create(docTitle);
    var body = doc.getBody();

    // Atur Margin Dokumen Standar (2 cm = 56.7 pt)
    body.setMarginTop(56.7);
    body.setMarginBottom(56.7);
    body.setMarginLeft(56.7);
    body.setMarginRight(56.7);

    // KOP Sekolah (Jika tersedia)
    if (schoolProfile && (schoolProfile.schoolName || schoolProfile.teacherName)) {
      var kopTable = body.appendTable([
        [
          (schoolProfile.schoolName ? schoolProfile.schoolName.toUpperCase() : "SMP NEGERI / SWASTA") + "\n" +
          "PERANGKAT PEMBELAJARAN & ADMINISTRASI GURU IPS SMP\n" +
          "Tahun Pelajaran: " + (schoolProfile.academicYear || "2025/2026") + " • Semester: " + (schoolProfile.semester || "Ganjil/Genap")
        ]
      ]);
      kopTable.setBorderColor("#94a3b8");
      kopTable.setBorderWidth(1);
      var cell = kopTable.getCell(0, 0);
      cell.getChild(0).asParagraph().setAlignment(DocumentApp.HorizontalAlignment.CENTER).setFontFamily("Calibri").setFontSize(10).setBold(true);
      body.appendParagraph("");
    }

    // Judul Utama Dokumen
    var hTitle = body.appendParagraph((title || "PERANGKAT PEMBELAJARAN IPS").toUpperCase());
    hTitle.setHeading(DocumentApp.ParagraphHeading.TITLE);
    hTitle.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    hTitle.setFontFamily("Calibri");
    hTitle.setFontSize(15);
    hTitle.setBold(true);
    hTitle.setForegroundColor("#0f172a");

    if (subjectInfo) {
      var sub = body.appendParagraph(subjectInfo);
      sub.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
      sub.setFontFamily("Calibri");
      sub.setFontSize(10);
      sub.setItalic(true);
      sub.setForegroundColor("#475569");
    }

    body.appendHorizontalRule();

    // Parse Markdown Baris per Baris
    var lines = (markdownContent || "").split("\n");
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i].trim();
      if (!line) {
        body.appendParagraph("");
        continue;
      }

      if (line.indexOf("### ") === 0) {
        var h3 = body.appendParagraph(line.replace("### ", ""));
        h3.setHeading(DocumentApp.ParagraphHeading.HEADING3);
        h3.setFontFamily("Calibri");
        h3.setFontSize(11);
        h3.setBold(true);
        h3.setForegroundColor("#334155");
      } else if (line.indexOf("## ") === 0) {
        var h2 = body.appendParagraph(line.replace("## ", ""));
        h2.setHeading(DocumentApp.ParagraphHeading.HEADING2);
        h2.setFontFamily("Calibri");
        h2.setFontSize(12);
        h2.setBold(true);
        h2.setForegroundColor("#1e293b");
      } else if (line.indexOf("# ") === 0) {
        var h1 = body.appendParagraph(line.replace("# ", ""));
        h1.setHeading(DocumentApp.ParagraphHeading.HEADING1);
        h1.setFontFamily("Calibri");
        h1.setFontSize(13);
        h1.setBold(true);
        h1.setForegroundColor("#0f172a");
      } else if (line.indexOf("- ") === 0 || line.indexOf("* ") === 0) {
        var li = body.appendListItem(line.substring(2));
        li.setFontFamily("Calibri");
        li.setFontSize(11);
      } else {
        var p = body.appendParagraph(line);
        p.setFontFamily("Calibri");
        p.setFontSize(11);
        p.setLineSpacing(1.15);
      }
    }

    // Tanda Tangan Guru & Kepala Sekolah (Jika diatur)
    if (schoolProfile && (schoolProfile.teacherName || schoolProfile.principalName)) {
      body.appendParagraph("");
      body.appendParagraph("");
      var signTable = body.appendTable([
        ["Kepala Sekolah,", "Guru Mata Pelajaran IPS,"],
        ["\n\n\n\n", "\n\n\n\n"],
        [
          (schoolProfile.principalName || "( ................................................ )") + "\nNIP. " + (schoolProfile.principalNip || "-"),
          (schoolProfile.teacherName || "( ................................................ )") + "\nNIP. " + (schoolProfile.teacherNip || "-")
        ]
      ]);
      signTable.setBorderWidth(0);
      for (var r = 0; r < 3; r++) {
        for (var c = 0; c < 2; c++) {
          var pCell = signTable.getCell(r, c).getChild(0).asParagraph();
          pCell.setFontFamily("Calibri").setFontSize(10);
          if (r === 2) pCell.setBold(true);
        }
      }
    }

    // WATERMARK FOOTER DOKUMEN
    body.appendHorizontalRule();
    var footerWatermark = body.appendParagraph(WATERMARK_TEXT);
    footerWatermark.setAlignment(DocumentApp.HorizontalAlignment.CENTER);
    footerWatermark.setFontFamily("Calibri");
    footerWatermark.setFontSize(8.5);
    footerWatermark.setItalic(true);
    footerWatermark.setForegroundColor("#64748b");

    // Header & Footer Bawaan Halaman
    var docFooter = doc.addFooter();
    var docFooterPara = docFooter.appendParagraph("IPS Maestro • " + AUTHOR_NAME + " (" + AUTHOR_WEB + ") • Halaman ");
    docFooterPara.appendPageNumber();
    docFooterPara.setAlignment(DocumentApp.HorizontalAlignment.RIGHT);
    docFooterPara.setFontSize(8);
    docFooterPara.setForegroundColor("#94a3b8");

    doc.saveAndClose();

    return {
      success: true,
      docId: doc.getId(),
      docUrl: doc.getUrl(),
      title: docTitle
    };
  } catch (err) {
    return {
      success: false,
      error: err.message || err.toString()
    };
  }
}

/**
 * Menyimpan Kunci API Gemini pengguna ke UserProperties
 */
function saveUserGeminiKey(apiKey) {
  try {
    PropertiesService.getUserProperties().setProperty('GEMINI_API_KEY', apiKey.trim());
    return { success: true, message: "Kunci API berhasil disimpan secara aman di akun Google Anda!" };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Menyimpan data profil sekolah & guru ke UserProperties
 */
function saveUserProfile(profileData) {
  try {
    PropertiesService.getUserProperties().setProperty('USER_PROFILE_DATA', JSON.stringify(profileData));
    return { success: true, message: "Profil guru dan sekolah berhasil disimpan!" };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Mengambil data awal konfigurasi pengguna saat Web App dimuat
 */
function getInitialAppConfig() {
  try {
    var key = PropertiesService.getUserProperties().getProperty('GEMINI_API_KEY') || "";
    var profileRaw = PropertiesService.getUserProperties().getProperty('USER_PROFILE_DATA');
    var profile = profileRaw ? JSON.parse(profileRaw) : null;
    var userEmail = Session.getActiveUser().getEmail() || "Akun Google Aktif";

    return {
      success: true,
      hasKey: !!key,
      maskedKey: key ? key.substring(0, 6) + "..." + key.substring(key.length - 4) : "",
      userEmail: userEmail,
      profile: profile,
      author: AUTHOR_NAME,
      website: AUTHOR_WEB,
      whatsappChannel: WA_CHANNEL
    };
  } catch (err) {
    return {
      success: false,
      hasKey: false,
      maskedKey: "",
      userEmail: "",
      profile: null
    };
  }
}
