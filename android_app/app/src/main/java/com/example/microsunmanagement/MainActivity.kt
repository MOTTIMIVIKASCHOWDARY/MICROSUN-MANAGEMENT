package com.example.microsunmanagement

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.Environment
import android.provider.MediaStore
import android.widget.Toast
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import androidx.core.content.FileProvider
import com.example.microsunmanagement.navigation.AppNavGraph
import com.example.microsunmanagement.ui.theme.MicrosunTheme
import com.example.microsunmanagement.viewmodel.AppViewModel
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : ComponentActivity() {

    private val viewModel: AppViewModel by viewModels()
    private var cameraPhotoPath: String? = null

    private val takePictureLauncher = registerForActivityResult(
        ActivityResultContracts.StartActivityForResult()
    ) { result ->
        if (result.resultCode == RESULT_OK) {
            Toast.makeText(this, "Leaf photo captured successfully!", Toast.LENGTH_SHORT).show()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        requestPermissions()

        setContent {
            MicrosunTheme {
                AppNavGraph(
                    viewModel = viewModel,
                    onTakePhoto = { openCamera() }
                )
            }
        }
    }

    private fun requestPermissions() {
        val permissions = mutableListOf<String>()
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            permissions.add(Manifest.permission.CAMERA)
        }
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_MEDIA_IMAGES) != PackageManager.PERMISSION_GRANTED) {
                permissions.add(Manifest.permission.READ_MEDIA_IMAGES)
            }
        } else {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                permissions.add(Manifest.permission.READ_EXTERNAL_STORAGE)
            }
        }
        if (permissions.isNotEmpty()) {
            ActivityCompat.requestPermissions(this, permissions.toTypedArray(), 1001)
        }
    }

    private fun openCamera() {
        val takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        if (takePictureIntent.resolveActivity(packageManager) != null) {
            var photoFile: File? = null
            try {
                val timeStamp = SimpleDateFormat("yyyyMMdd_HHmmss", Locale.getDefault()).format(Date())
                val storageDir = getExternalFilesDir(Environment.DIRECTORY_PICTURES)
                photoFile = File.createTempFile("CROP_${timeStamp}_", ".jpg", storageDir)
                cameraPhotoPath = photoFile.absolutePath
            } catch (ex: IOException) {
                Toast.makeText(this, "Camera Error", Toast.LENGTH_SHORT).show()
            }

            if (photoFile != null) {
                val photoURI: Uri = FileProvider.getUriForFile(
                    this,
                    "${packageName}.fileprovider",
                    photoFile
                )
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI)
                takePictureLauncher.launch(takePictureIntent)
            }
        }
    }
}
