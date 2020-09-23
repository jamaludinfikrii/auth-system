use jc;
select * from class;
select * from students;

-- join table = menampilkan data lebih dari satu table 

-- one to many table relation
select s.id, s.name, c.name from students s
join class c on s.id_kelas = c.id where c.name = 'JCWM';


select * from kelas;
select * from siswa;
-- many to many table relation
select * from conn_kelas_siswa;

select s.id as id_siswa, s.nama as nama_siswa, k.nama as kelas from conn_kelas_siswa c
join kelas k on c.id_kelas = k.id
join siswa s on s.id = c.id_siswa having kelas = 'web';

select s.id as id_siswa, s.nama as nama_siswa, k.nama as kelas from conn_kelas_siswa c
join kelas k on c.id_kelas = k.id
join siswa s on s.id = c.id_siswa having nama_siswa = 'andi';




-- many to many
-- product dan users
	-- product [id, nama, price,image,desc ] 
    -- users [ id, nama, address ]
    -- cart [ id , id_product, id_user, qty]
    
    


-- ONE TO ONE TABLE 
select * from siswa_detail;

select s.id, nama, alamat, nomor_telpon, tanggal_lahir from siswa s 
join siswa_detail sd on s.id = sd.id_siswa;

   

